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
    const CurrentUser = await Auth.verify(req.headers.authorization)
    if (!CurrentUser) {
      resp.status(401).json({error: 'User not Authorized'})
      return
    }
    let post = new Post({
      title: req.body.title,
      body: req.body.body,
      author: CurrentUser.id
    })
    post.slug = helpers.slugify(req.body.title)
    post.save()
    resp.json({
      post: post,
      message: 'created'
    })
  },

  async delete (req, resp) {
    let token = await Auth.verify(req.headers.authorization)
    const currentUser = await User.findById(token.id)
    if (!currentUser) {
      resp.status(401).json({error: 'User not Authorized'})
      return
    }
    let post = await Post.find({slug: req.params.slug}).populate('author')
    if ((post.author._id === currentUser._id) || currentUser.roles.includes('admin')) {
      post.remove()
      resp.json({delete: 'ok'})
    } else {
      resp.status(401).json({error: 'Not Authorized'})
    }
  }
}
