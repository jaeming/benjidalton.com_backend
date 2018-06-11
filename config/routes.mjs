import express from 'express'
import Controllers from '../controllers'

export default {

  init() {
    this.router = express.Router()
    this.list.forEach((route) => {
      this.setRoute(route)
      if (route.children) {
        route.children.forEach((child) => this.setRoute(child))
      }
    })
    return this.router
  },

  setRoute(route, router) {
    console.log(`${route.name} - ${route.type}: ${route.path}`)
    this.router[route.type](route.path, (request, response) => {
      Controllers[route.controller][route.action](request, response)
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