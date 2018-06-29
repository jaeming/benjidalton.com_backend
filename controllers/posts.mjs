import Auth from '../lib/auth'
import Post from '../models/post'
import serializer from '../serializers/post'

export default {

  index (req, resp) {
    let query = Post.find().populate('author')
    query.exec()
      .then((posts) => resp.json(posts))
      .catch((error) => resp.send(error))
  },

  async show (req, resp) {
    let post = await Post.findById(req.params.id)
      .populate('author')
      .populate({
        path: 'comments',
        populate: {path: 'author'}
      })
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
    post.save()
    resp.json({
      post: post,
      message: 'created'
    })
  }
}
