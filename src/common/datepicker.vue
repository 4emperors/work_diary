<style scoped>
.datetime-picker {
    position: relative;
    display: inline-block;
    font-family: "Segoe UI","Lucida Grande",Helvetica,Arial,"Microsoft YaHei";
    -webkit-font-smoothing: antialiased;
    color: #333;
}

.datetime-picker * {
    box-sizing: border-box;
}

.datetime-picker input {
    width: 100%;
    padding: 5px 10px;
    height: 30px;
    outline: 0 none;
    border: 1px solid #ccc;
    font-size: 13px;
}

.datetime-picker .picker-wrap {
    position: absolute;
    z-index: 1000;
    width: 238px;
    height: 280px;
    margin-top: 2px;
    background-color: #fff;
    box-shadow: 0 0 6px #ccc;
}

.datetime-picker table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    font-size: 13px;
}

.datetime-picker tr {
    height: 34px;
    border: 0 none;
}

.datetime-picker th, .datetime-picker td {
    user-select: none;
    width: 34px;
    height: 34px;
    padding: 0;
    border: 0 none;
    line-height: 34px;
    text-align: center;
}

.datetime-picker td {
    cursor: pointer;
}

.datetime-picker td:hover {
    background-color: #f0f0f0;
}

.datetime-picker td.date-pass, .datetime-picker td.date-future {
    color: #aaa;
}

.datetime-picker td.date-active {
    background-color: #ececec;
    color: #3bb4f2;
}

.datetime-picker .date-head {
    background-color: #3bb4f2;
    text-align: center;
    color: #fff;
    font-size: 14px;
}

.datetime-picker .date-days {
    color: #3bb4f2;
    font-size: 14px;
}

.datetime-picker .show-year {
    display: inline-block;
    min-width: 62px;
    vertical-align: middle;
}

.datetime-picker .show-month {
    display: inline-block;
    min-width: 28px;
    vertical-align: middle;
}

.datetime-picker .btn-prev,
.datetime-picker .btn-next {
    cursor: pointer;
    display: inline-block;
    padding: 0 10px;
    vertical-align: middle;
}

.datetime-picker .btn-prev:hover,
.datetime-picker .btn-next:hover {
    background: rgba(16, 160, 234, 0.5);
}
.timetab, .datetab{
    padding: 2px 6px;
    font-size: 20px;
    top: -20px;
    position: relative;
    width: 100px;
    display: inline-block;
    color: #fff;
    background: #3bb4f2;
 }

.timeselect{
    border: 1px solid;
    padding: 2px 6px;
    font-size: 20px;
    font-weight: bold;
 }
 .timeselect_area {
   height:260px;
 }
</style>

<template>
    <div class="datetime-picker" :style="{ width: width }">
        <input
                type="text"
                v-bind:name="name"
                :style="styleObj"
                :readonly="readonly"
                :value="value"
                @click="show = !show">
        <div class="picker-wrap" v-show="show">
            <table v-show=" type =='date'" class="date-picker">
                <thead>
                <tr class="date-head">
                    <th colspan="4">
                        <span class="btn-prev" @click="yearClick(-1)">&lt;</span>
                        <span class="show-year">{{now.getFullYear()}}</span>
                        <span class="btn-next" @click="yearClick(1)">&gt;</span>
                    </th>
                    <th colspan="3">
                        <span class="btn-prev" @click="monthClick(-1)">&lt;</span>
                        <span class="show-month">{{months[now.getMonth()]}}</span>
                        <span class="btn-next" @click="monthClick(1)">&gt;</span>
                    </th>
                </tr>
                <tr class="date-days">
                    <th v-for="day in days">{{day}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in 6">
                    <td v-for="j in 7"
                        :class="date[i * 7 + j] && date[i * 7 + j].status"
                        :date="date[i * 7 + j] && date[i * 7 + j].date"
                        @click="pickDate(i * 7 + j)">{{date[i * 7 + j] && date[i * 7 + j].text}}</td>
                </tr>
                </tbody>
            </table>
            <table v-show="type=='datetime'" class="date-picker timeselect_area">
                  <tr>
                      <td><span @click="chnagetime('h',1)" class="timeselect">+</span></td>
                      <td> {{('0'+ hours).slice(-2)}} </td>
                      <td><span  @click="chnagetime('h',-1)" class="timeselect">-</span></td>
                </tr>
                <tr>
                      <td> <span @click="chnagetime('m',1)" class="timeselect">+</span>  </td>
                      <td>  {{('0'+ (minutes>=0?minutes%60:0)).slice(-2)}} </td>
                      <td> <span  @click="chnagetime('m',-1)" class="timeselect">-</span>  </td>
                </tr>
                <tr>
                      <td> <span @click="seconds++" class="timeselect">+</span>  </td>
                      <td>  {{('0'+ (seconds>=0?seconds%60:0)).slice(-2)}} </td>
                      <td> <span  @click="seconds--" class="timeselect">-</span>  </td>
                </tr>
             </table>
            <span class="timetab"  @click="tabchange('datetime')">时间</span>
            <span class="datetab" @click="tabchange('date')">日历</span>
        </div>
    </div>
</template>

<script>
    export default {
       format(date,fmt) {
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        props: {
            change:{ type: Function },
            width: { type: String, default: '238px' },
            readonly: { type: Boolean, default: false },
            value: { type: String, default: '' },
            format: { type: String, default: 'YYYY-MM-DD' },
            name: { type: String, default: '' }
        },
        data () {
            return {
                show: false,
                type:'date',
                days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                date: [],
                now: new Date(),
                hours:new Date().getHours(),
                minutes:new Date().getMinutes(),
                seconds:new Date().getSeconds()
            };
        },
        watch: {
            value(){
            if(this.change)
              this.change(this.value);
            },
            now () {
                this.update();
            },
            show () {
                this.update();
            }
        },
        methods: {
            chnagetime(type,num){
               var me=this;
                switch(type){
                 case 'h':
                    me.hours+=num;
                    me.hours=me.hours>=0?me.hours%24:0
                    break;
                 case 'm':
                    me.minutes+=num;
                    me.minutes=me.minutes>=0?me.minutes%60:0
                    break;
                 case 's':
                      me.seconds+=num;
                      me.seconds = me.seconds>=0?me.seconds%60:0;
                       break;
                }
                this.value = this.stringify();
            },
            close () {
                this.show = false;
            },
            tabchange(type){
             this.type=type;
            },
            update () {
                var arr = [];
                var time = new Date(this.now);
                time.setMonth(time.getMonth(), 1);           // the first day
                var curFirstDay = time.getDay();
                curFirstDay === 0 && (curFirstDay = 7);
                time.setDate(0);                             // the last day
                var lastDayCount = time.getDate();
                for (let i = curFirstDay; i > 0; i--) {
                    arr.push({
                        text: lastDayCount - i + 1,
                        time: new Date(time.getFullYear(), time.getMonth(), lastDayCount - i + 1),
                        status: 'date-pass'
                    });
                }

                time.setMonth(time.getMonth() + 2, 0);       // the last day of this month
                var curDayCount = time.getDate();
                time.setDate(1);                             // fix bug when month change
                var value = this.value || this.stringify(new Date());
                for (let i = 0; i < curDayCount; i++) {
                    let tmpTime = new Date(time.getFullYear(), time.getMonth(), i + 1);
                    let status = '';
                    this.stringify(tmpTime) === value && (status = 'date-active');
                    arr.push({
                        text: i + 1,
                        time: tmpTime,
                        status: status
                    });
                }

                var j = 1;
                while (arr.length < 42) {
                    arr.push({
                        text: j,
                        time: new Date(time.getFullYear(), time.getMonth() + 1, j),
                        status: 'date-future'
                    });
                    j++;
                }
                this.date = arr;
            },
            yearClick (flag) {
                this.now.setFullYear(this.now.getFullYear() + flag);
                this.now = new Date(this.now);
            },
            monthClick (flag) {
                this.now.setMonth(this.now.getMonth() + flag);
                this.now = new Date(this.now);
            },
            pickDate (index) {
                this.now = new Date(this.date[index].time);
                this.value = this.stringify();
            },
            parse (str) {
                var time = new Date(str);
                return isNaN(time.getTime()) ? null : time;
            },
            stringify (time = this.now, format = this.format) {
                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                var date = time.getDate();
                var monthName = this.months[time.getMonth()];
                var map = {
                    YYYY: year,
                    MMM: monthName,
                    MM: ('0' + month).slice(-2),
                    M: month,
                    DD: ('0' + date).slice(-2),
                    D: date,
                    HH: ('0' +this.hours).slice(-2),
                    mm: ('0' +this.minutes).slice(-2),
                    ss: ('0' + this.seconds).slice(-2)
                };
                return format.replace(/Y+|M+|D+|s+|H+|m+/g, function (str) {
                    return map[str];
                });
            },
            leave (e) {
                if (!this.$el.contains(e.target)) {
                    this.close();
                }
            }
        },
        ready () {
            this.now = this.parse(this.value) || new Date();
            document.addEventListener('click', this.leave, false);
        },
        beforeDestroy () {
          document.removeEventListener('click', this.leave, false);
        }
    };
</script>