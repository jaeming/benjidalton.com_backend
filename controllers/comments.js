import Auth from '../lib/auth'
import Comment from '../models/comment'
import Post from '../models/post'
import response from '../helpers/response'

export default {

  async index (req, resp) {
    let query = {}
    if (req.query.post) {
      let post = await Post.findOne({slug: req.query.post})
      if (post) { query = {post: post._id} }
    }
    const comments = await Comment.find(query)
    resp.json(comments)
  },

  show (req, resp) {
    let query = Comment.findById(req.params.id)
    query.exec()
      .then((comment) => resp.json(comment))
      .catch((error) => response.error(resp, error))
  },

  async create (req, resp) {
    let user = this.user(req)
    if (!user) { return response.unauthorized(resp) }
    try {
      const post = await Post.findById(req.body.post_id)
      let comment = new Comment({
        text: req.body.text,
        post: post.id,
        author: user.id
      })
      comment.save()
      post.comments.push(comment)
      post.save()

      resp.json({
        comment: comment,
        message: 'created'
      })
    } catch (err) {
      return response.error(resp, err)
    }
  },

  async update (req, resp) {
    try {
      let user = this.user(req)
      const comment = await Comment.findById(req.params.id)
      const allowed = user && (user.id === comment.author || user.roles.includes('admin'))
      if (allowed) {
        comment.text = req.body.text
        comment.edited = Date.now()
        comment.save()
        resp.json(comment)
      } else {
        return response.unauthorized(resp)
      }
    } catch (err) {
      return response.error(resp, err)
    }
  },

  user (req) {
    return Auth.verify(req.headers.authorization)
  }

}
