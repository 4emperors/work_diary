<template>
  <div id="app">
    <hader-component />
    <router-view></router-view>
    <foot v-if="!isAuthed"/>
    <nav-component v-if="isAuthed"/>
  </div>
</template>

<script>

import Header from './pages/Header.vue'

import Foot from './pages/Foot.vue'

import Nav from './pages/Nav.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
     isAuthed(){
       return this.$store.state.auth.isAuthed;
     }
  },
  components:{
            'foot':Foot,
            'hader-component': Header,
            'nav-component': Nav
        }
}
</script>

<style>
body,ul,li{ margin: 0; padding: 0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px auto;
}

h1, h2 {
  font-weight: normal;
  margin: 0;
}
a{
 font-size:12px;
}


</style>
