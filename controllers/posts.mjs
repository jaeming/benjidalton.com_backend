import Post from '../models/post'

export default {

  index (req, resp) {
    let query = Post.find().populate('author')
    query.exec()
      .then((posts) => resp.json(posts))
      .catch((error) => resp.send(error))
  },

  show (req, resp) {
    let query = Post.findById(req.params.id).populate('author')
    query.exec()
      .then((post) => resp.json(post))
      .catch((error) => resp.send(error))
  },

  create (req, resp) {
    let post = new Post({
      title: req.body.title,
      body: req.body.body
      // author: currentUser._id
    })

    resp.json({
      post: post,
      message: 'created'
    })
  }
}
