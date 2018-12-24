import Auth from '../lib/auth'
import Post from '../models/post'
import helpers from '../helpers'
import serializer from '../serializers/post'

export default {

  async index (req, resp) {
    let posts = await Post.find().populate('author')
    let json = serializer.index(posts)
    resp.json(json)
  },

  async show (req, resp) {
    let post = await Post.findOne({slug: req.params.slug}).populate('author')
    let json = serializer.show(post)
    resp.json(json)
  },

  async create (req, resp) {
    let user = this.user(req)
    if (user && user.roles.includes('admin')) {
      let post = new Post(this.postParams(req.body))
      post.author = user.id
      post.save()
      resp.json({post, message: 'created'})
    } else {
      resp.status(401).json({error: 'User not Authorized'})
    }
  },

  async update (req, resp) {
    let user = this.user(req)
    if (!user) { return resp.status(401).json({error: 'User not Authorized'}) }
    let post = await Post.findOne({slug: req.params.slug}).populate('author')
    if (user.roles.includes('admin') || post.author.equals(user.id)) {
      Object.assign(post, this.postParams(req.body))
      await post.save()
      resp.json({post, message: 'updated'})
    } else {
      resp.status(401).json({error: 'User not Authorized'})
    }
  },

  async delete (req, resp) {
    let user = this.user(req)
    if (!user) { return resp.status(401).json({error: 'User not Authorized'}) }
    let post = await Post.findOne({slug: req.params.slug}).populate('author')
    if (user.roles.includes('admin') || post.author.equals(user.id)) {
      post.remove()
      resp.json({delete: 'ok'})
    } else {
      resp.status(401).json({error: 'User not Authorized'})
    }
  },

  postParams (attr) {
    return {
      title: attr.title,
      body: attr.body,
      published: attr.published,
      slug: helpers.slugify(attr.title),
      date: Date.now()
    }
  },

  user (req) {
    return Auth.verify(req.headers.authorization)
  }
}
