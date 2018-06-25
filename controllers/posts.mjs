import Auth from '../lib/auth'
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

  async create (req, resp) {
    const CurrentUser = await Auth.verify(req.headers.authorization)
    if (CurrentUser && CurrentUser.id) {
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
    } else {
      resp.status(401).json({error: 'User not Authorized'})
    }
  }
}
