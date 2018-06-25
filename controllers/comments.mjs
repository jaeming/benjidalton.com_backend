import Comment from '../models/comment'

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

  create (req, resp) {
    let comment = new Comment()
    console.log(req.body)
    comment.text = req.body.text
    comment.save()
    resp.json({
      comment: comment,
      message: 'created'
    })
  }
}
