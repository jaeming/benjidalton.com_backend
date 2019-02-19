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
    try {
      const post = await Post.findById(req.body.post_id)
      let comment = new Comment({
        text: req.body.text,
        post: post.id,
        author: req.user.id
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
      const comment = await Comment.findById(req.params.id).populate('author')
      const allowed = req.user && (comment.author.equals(req.user.id) || req.user.roles.includes('admin'))
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
  }

}
