<template>
    <div class="bottom_nav">
        <ul class="nav_ul">
            <li><router-link :to="'home'">首页</router-link></li>
            <li><router-link :to="'overtime'">加班</router-link></li>
            <li><router-link :to="'todo'">备忘</router-link></li>
            <li>我</li>
         </ul>
    </div>
</template>
<style>
    .bottom_nav{
       position:fixed;
       bottom:0px;
       width:100%;
       background-color:#6abfc7;
    }
    .bottom_nav ul{
     list-style-type: none;
     }
     .bottom_nav li{
       height:45px;
       line-height:45px;
        width:20%;
        display: inline-block;
     }
</style>
<script>
    export default{
        data(){
            return{
            }
        }
    }
</script>
