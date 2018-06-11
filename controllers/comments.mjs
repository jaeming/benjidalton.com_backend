import Comment from '../models/comment'
export default {

  index (req, resp) {
    let comments = Comment.find( (err, comments) => {
      if (err) {
        resp.send(err)
      }
      resp.json(comments)
    })
  },
  
  show (req, resp) {
    Comment.findById(req.params.id, (err, comment) => {
      if (err) {
        resp.send(err)
      }
      resp.json(comment)
    })
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