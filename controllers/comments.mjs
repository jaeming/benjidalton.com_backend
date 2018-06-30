import Auth from '../lib/auth'
import Comment from '../models/comment'
import Post from '../models/post'
import User from '../models/user'

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
    try {
      const post = await Post.findById(req.body.post_id)
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
    } catch (err) {
      resp.status(500).json({error: err})
    }
  },

  async update (req, resp) {
    try {
      let token = await Auth.verify(req.headers.authorization)
      const currentUser = await User.findById(token.id)
      if (!currentUser) {
        resp.status(401).json({error: 'User not Authorized'})
        return
      }
      const comment = await Comment.findById(req.params.id).populate('author')
      if ((currentUser._id === comment.author._id) || currentUser.admin) {
        comment.text = req.body.text
        comment.edited = Date.now()
        console.log(comment)
        comment.save()
        resp.json({
          comment: comment,
          message: 'Updated'
        })
      } else {
        resp.status(401).json({error: 'Not Authorized'})
      }
    } catch (err) {
      resp.status(500).json({error: err})
    }
  }

}
