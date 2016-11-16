<template>
    <div>
        <div class="login_panel" v-if="type==1">
            <p>
                You need 登录 first.
            </p>
            <form @submit.prevent="login">
                <p><input v-model="email" placeholder="email"></p>
                <p><input v-model="pass" placeholder="password" type="password"></p>
                <button type="submit">登录</button>
                <a @click="toggle">没有过,没关系,注册一个</a>
                <p v-if="error" class="error">Bad login information</p>
            </form>
        </div>
        <div class="regist_panel" v-else>
            <h2>注册</h2>
            <p>
                来个注册,少年,说你呢!
            </p>
            <form @submit.prevent="regist">
                <p><input v-model="email" type="email" placeholder="email"></p>
                <p><input v-model="pass" placeholder="输入密码" type="password"></p>
                <p><input v-model="pass_check" placeholder="再次输入密码" type="password"></p>
                <button type="submit">注册</button>
                <a @click="toggle">己有账号,有眼光,请登录!</a>
                <p v-if="error" class="error">Bad login information</p>
            </form>
        </div>
    </div>
</template>

<style>

    .login_panel input,.regist_panel input{
      width:200px;
      height:40px;
      font-size:16px;
    }

    .login_panel button,.regist_panel button{
      font-size:16px;
       padding:8px 20px;
       border-radius:10px;
    }


</style>

<script>
import auth from '../../auth'

export default {

  data () {
    return {
      type:1,
      email: '',
      pass: '',
      pass_check: '',
      error: false
    }
  },
  methods: {
    toggle(){
       if(this.type>=1){
       this.type=0
       }else{
        this.type=1;
       }
    },
    regist(){
        let vm=this;
        this.$store.dispatch('regist', {
            email:this.email,
            pass: this.pass,
            cb:(loggedIn,user )=> {
            if (loggedIn) {
                alert("注册成功,已经为您登录!");
               console.log(user)
              vm.$router.replace(vm.$route.query.redirect || '/')
            }else{
              alert("注册失败");
            }
          }
         })
    },
    login () {
        let vm=this;
        this.$store.dispatch('login', {
        email:this.email,
        pass: this.pass,
        cb:loggedIn => {
        if (loggedIn) {
          vm.$router.replace(vm.$route.query.redirect || '/')
        }
      }
     })
    }
  }
}


</script>
