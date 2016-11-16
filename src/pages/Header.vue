<template>
    <div class="header">
        <h1>易工作   <a v-if="isAuthed" @click="logout">退出</a></h1>

    </div>
</template>
<style>
    .header{
    height:50px;
    line-height:50px;
    background-color:#6abfc7;
    overflow:hidden;
   }
</style>
<script>
import auth from '../auth'

export default {
    data () {
        return {
        }
     },
     updated () {
     },
     created () {
     },
    computed:{
     isAuthed(){
       return this.$store.state.auth.isAuthed;
     }
    },
    methods: {
        logout () {
            let vm=this;
            vm.$store.dispatch('logout', {
            cb:loggedOut => {
                  vm.$router.replace( '/login')
              }
            });
          }
        }
}



</script>