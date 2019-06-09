import Post from '../models/post'
import helpers from '../helpers'
import serializer from '../serializers/post'
import response from '../helpers/response'

export default {

  async index (req, resp) {
    let posts = await Post.find().populate('author').sort({date: -1})
    let json = serializer.index(posts)
    resp.json(json)
  },

  async show (req, resp) {
    let post = await Post.findOne({slug: req.params.slug}).populate('author')
    let json = serializer.show(post)
    resp.json(json)
  },

  async create (req, resp) {
    let post = new Post(postParams(req.body))
    post.author = req.user.id
    await post.save()
    resp.json({post, message: 'created'})
  },

  async update (req, resp) {
    let post = await Post.findOne({slug: req.params.slug}).populate('author')
    const allowed = req.user.roles.includes('admin') || post.author.equals(req.user.id)
    if (!allowed) { return response.unauthorized(resp) }
    Object.assign(post, postParams(req.body))
    await post.save()
    resp.json({post, message: 'updated'})
  },

  async delete (req, resp) {
    let post = await Post.findOne({slug: req.params.slug}).populate('author')
    const allowed = req.user.roles.includes('admin') || post.author.equals(req.user.id)
    if (!allowed) { return response.unauthorized(resp) }
    post.remove()
    resp.json({delete: 'ok'})
  }
}

function postParams (attr) {
  return {
    title: attr.title,
    summary: attr.summary,
    body: attr.body,
    published: attr.published,
    slug: helpers.slugify(attr.title),
    date: Date.now()
  }
}
