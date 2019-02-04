import Image from '../models/image'
import Auth from '../lib/auth'

export default {
  create (req, resp) {
    const currentUser = Auth.verify(req.headers.authorization)
    if (!currentUser) {
      return resp.status(401).json({error: 'User not Authorized'})
    }
    let image = new Image({
      name: req.file.key,
      contentType: req.body,
      meta: req.file,
      url: req.file.location
    })
    image.save()
    resp.json({url: image.url})
  }
}
