import express from 'express'
import Controllers from '../controllers'

export default {

  init () {
    this.router = express.Router()
    this.list.forEach((route) => {
      this.setRoute(route)
      if (route.children) {
        route.children.forEach((child) => this.setRoute(child))
      }
    })
    return this.router
  },

  setRoute (route, router) {
    console.log(`${route.name} - ${route.type}: ${route.path}`)
    this.router[route.type](route.path, (request, response) => {
      Controllers[route.controller][route.action](request, response)
    })
  },

  list: [
    {
      name: 'home',
      path: '/',
      controller: 'home',
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
          name: 'commentShow',
          path: `/comments/:id`,
          controller: 'comments',
          action: 'show',
          type: 'get'
        },
        {
          name: 'commentUpdate',
          path: `/comments/:id`,
          controller: 'comments',
          action: 'update',
          type: 'put'
        }
      ]
    },
    {
      name: 'commentCreate',
      path: '/comments',
      controller: 'comments',
      action: 'create',
      type: 'post'
    },
    {
      name: 'register',
      path: '/users',
      controller: 'users',
      action: 'create',
      type: 'post'
    },
    {
      name: 'userUpdate',
      path: '/users',
      controller: 'users',
      action: 'update',
      type: 'put'
    },
    {
      name: 'users',
      path: '/users',
      controller: 'users',
      action: 'index',
      type: 'get'
    },
    {
      name: 'login',
      path: '/sessions',
      controller: 'sessions',
      action: 'create',
      type: 'post'
    },
    {
      name: 'postCreate',
      path: '/posts',
      controller: 'posts',
      action: 'create',
      type: 'post'
    },
    {
      name: 'postsIndex',
      path: '/posts',
      controller: 'posts',
      action: 'index',
      type: 'get',
      children: [
        {
          name: 'postsShow',
          path: '/posts/:slug',
          controller: 'posts',
          action: 'show',
          type: 'get'
        },
        {
          name: 'postsUpdate',
          path: '/posts/:slug',
          controller: 'posts',
          action: 'update',
          type: 'patch'
        },
        {
          name: 'postsDelete',
          path: '/posts/:slug',
          controller: 'posts',
          action: 'delete',
          type: 'delete'
        }
      ]
    }

  ]
}
