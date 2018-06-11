import Comment from '../models/comment'
export default {

  index (req, resp) {
    let query = Comment.find()
    query.exec()
      .then((comments) => resp.json(comments))
      .catch((error) => resp.send(error))
  },
  
  show (req, resp) {
    let query = Comment.findById(req.params.id)
    query.exec()
      .then((comment) => resp.json(comment))
      .catch((error) => resp.send(error))
  },

  create (req, resp) {
    let comment = new Comment()
    comment.text = req.body.text
    comment.save()
    resp.json({
      comment: comment,
      message: 'created'
    })
  }
}