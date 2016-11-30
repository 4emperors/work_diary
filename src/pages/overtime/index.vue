<template>
    <div>
        <ul class="nav">
            <li class="current"><a href="">添加</a></li>
            <li><a href="">查看</a></li>
        </ul>
        <div class="wrapper mt50">


            <form id="add_form">
                <div class="form-group">
                    <label>日期:</label>
                    <DatePicker :readonly="true"  :change="change" format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                </div>
                <div class="form-group">
                    <label>姓名：</label>
                    <select v-model="staff">
                        <option v-for="staff in staffs" :value="staff.name">{{staff.name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>天：</label>
                    <input type="text" v-model="day" name="">
                </div>
                <div class="form-group">
                    <label>小时：</label>
                    <input type="text" v-model="hour" name="">
                </div>
                <div class="form-group">
                    <label>分：</label>
                    <input type="text" v-model="minite" name="">
                </div>
                <div class="form-group">
                    <label></label>
                    <input class="button" @click="save" type="button" value="保存">
                </div>
            </form>
        </div>
    </div>
</template>
<style>
html,body,h1,h2,h3,h4,h5,h6,p,ul,ol,li,a,input{
	font-family: 'Microsoft Yahei';margin: 0;	padding: 0;list-style: none;text-decoration: none;}
.wrapper{width: 1000px; margin: 0 auto;}
.mt50{margin-top: 50px;}

.nav{width: 200px; height: 50px; margin:0 auto;}
.nav li{width: 100px; height: 50px; float: left; text-align: center;}
.nav a{line-height: 25px; border-bottom: 3px solid #fff;	display: inline-block; color: #333; margin-top: 11px;}
.nav li.current a{border-bottom: 3px solid #42b983;}

.form-group{margin: 10px;}
.form-group label{width: 100px; text-align: right; margin-right: 10px; line-height: 30px; display: inline-block;}
.form-group input{width: 500px; line-height: 28px; border: 1px solid #ccc;padding: 0 5px;}
.form-group select{width: 512px; line-height: 28px; height:30px; border: 1px solid #ccc;padding: 0 5px;}
.form-group .button{background-color:#6abfc7; border:none; width:200px; border-radius:5px; color:#fff;}
</style>
<script>

import DatePicker from '../../common/datepicker.vue'
    export default{
     components:{ DatePicker },
     methods:{
        change(val){
         this.date=val;
        },
         save(){
            console.log(this.date);
         }
     },
    data(){
        return{
            date:DatePicker.format(new Date(),"yy-MM-dd"),
            staffs:[
                {name:'李雅宁'},
                {name:'李雅宁'},
                {name:'李雅宁'}
            ],
            day:'',
            hour:'',
            minute:''
        }
    }
  }
</script>
