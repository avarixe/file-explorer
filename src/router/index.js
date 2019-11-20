import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import TagsPage from '@/pages/TagsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/tags',
      name: 'Tags',
      component: TagsPage
    }
  ],
  mode: 'history'
})
