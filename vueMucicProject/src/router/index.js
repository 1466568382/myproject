import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hot from '../views/Hot.vue'
import Search from '../views/Search.vue'
import PlayList from '../views/playList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hot',
    name: 'Hot',
    component: Hot
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: PlayList
  },

]

const router = new VueRouter({
  routes
})

export default router
