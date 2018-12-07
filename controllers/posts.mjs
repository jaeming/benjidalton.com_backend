import Auth from '../lib/auth'
import Post from '../models/post'
import User from '../models/user'
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
    const user = await Auth.verify(req.headers.authorization)
    if (user && user.roles.includes('admin')) {
      let post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published,
        slug: helpers.slugify(req.body.title),
        author: user.id,
        date: Date.now()
      })
      post.save()
      resp.json({
        post: post,
        message: 'created'
      })
    } else {
      resp.status(401).json({error: 'User not Authorized'})
    }
  },

  async delete (req, resp) {
    let token = await Auth.verify(req.headers.authorization)
    const user = await User.findById(token.id)
    let post = await Post.findOne({slug: req.params.slug}).populate('author')
    const admin = user.roles.includes('admin')
    const owner = post.author.equals(user._id)
    if (user && admin && owner) {
      post.remove()
      resp.json({delete: 'ok'})
    } else {
      resp.status(401).json({error: 'User not Authorized'})
    }
  }
}
