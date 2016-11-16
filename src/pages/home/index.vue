<template src="./index.html" >
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        computed:{
          userInfo(){
             return this.$store.state.auth.userInfo;
          }
        }
    }
</script>
