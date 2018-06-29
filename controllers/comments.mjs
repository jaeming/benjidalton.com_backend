import Auth from '../lib/auth'
import Comment from '../models/comment'
import Post from '../models/post'

export default {

  async index (req, resp) {
    const comments = await Comment.find()
    resp.json(comments)
  },

  show (req, resp) {
    let query = Comment.findById(req.params.id)
    query.exec()
      .then((comment) => resp.json(comment))
      .catch((error) => resp.send(error))
  },

  async create (req, resp) {
    const CurrentUser = await Auth.verify(req.headers.authorization)
    if (!CurrentUser) {
      resp.status(401).json({error: 'User not Authorized'})
      return
    }
    const post = await Post.findById(req.body.post_id)
    if (post) {
      let comment = new Comment({
        text: req.body.text,
        post: post._id,
        author: CurrentUser.id
      })
      comment.save()
      post.comments.push(comment)
      post.save()
      resp.json({
        comment: comment,
        message: 'created'
      })
    } else {
      resp.status(401).json({error: 'Could not find associated Post'})
    }
  },

  update (req, resp) {
    // TODO
  }

}
