import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import App from './App.vue'
import IndexPage from './pages/home/index.vue'
import overtimePage from './pages/overtime/index.vue'

import LoginPage from './pages/login/index.vue'
import todoPage from './pages/todo/todo.vue'

import store from './store/Store'

import data from './store/Data'

function requireAuth (to, from, next) {
  if (!store.state.auth.isAuthed) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
}

const routes = [
  { path: '/', component: App,redirect:'/home' },
  { path: '/home', component: IndexPage ,beforeEnter:requireAuth},
  { path: '/login', component: LoginPage },
  { path: '/todo', component: todoPage,beforeEnter:requireAuth },
  { path: '/overtime', component: overtimePage },
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})


const  app = new Vue({
  router:router,
  store:store,
  render: h => h(App)
}).$mount('#app');




