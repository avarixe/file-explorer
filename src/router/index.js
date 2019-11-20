import Vue from 'vue'
import Router from 'vue-router'
import BrowsePage from '@/pages/BrowsePage'
import TagsPage from '@/pages/TagsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/browse',
      name: 'Browse',
      component: BrowsePage
    },
    {
      path: '/tags',
      name: 'Tags',
      component: TagsPage
    }
  ],
  mode: 'history'
})
