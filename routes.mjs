export default {
  prefix: '/api',

  create(app, router) {
    this.app = app
    this.router = router
    this.list.forEach((route) => {
      this.setRoute(route)
      if (route.children) {
        route.children.forEach((child) => this.setRoute(child))
      }
    })
    app.use(this.prefix, router);
  },

  setRoute(route, router) {
    console.log(`${route.name} - ${route.type}: ${route.path}`)
    this.router[route.type](route.path, (request, response) => {
      this.app.controllers[route.controller][route.action](request, response)
    })
  },

  list: [
    { 
      name: 'root',
      path: '/',
      controller: 'root',
      action: 'show',
      type: 'get'
    },
    {
      name: 'comments',
      path: '/comments',
      controller: 'comments',
      action: 'index',
      type: 'get',
      children: [
        {
          name: 'comment',
          path: `/comments/:id`,
          controller: 'comments',
          action: 'show',
          type: 'get'
        }
      ]
    },
    {
      name: 'commentCreate',
      path: '/comments',
      controller: 'comments',
      action: 'create',
      type: 'post',
    }
  ]
}