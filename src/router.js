import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'ProjList',
      component: () => import('./views/ProjList.vue')
    },
    {
      path: '/project/:projId',
      name: 'Project',
      component: () => import('./views/Project.vue'),
      children: [{
          path: 'designer',
          name: "Designer",
          component: () => import('./views/ChartDesigner.vue'),
        },
        {
          path: 'viewer',
          name: "Viewer",
          component: () => import('./views/ChartViewer.vue'),
        },
        {
          path: 'projsrc',
          name: "ProjSrc",
          component: () => import('./views/ProjSrc.vue'),
        }
      ]
    },
    // {
    //   path: '/about',
    //   name: "About",
    //   component: () => import('./views/About.vue'),

    // }
  ]
})