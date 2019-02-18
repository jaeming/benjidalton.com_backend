import Image from '../models/image'
import Auth from '../lib/auth'
import response from '../helpers/response'

export default {
  create (req, resp) {
    const user = Auth.verify(req.headers.authorization)
    if (!user || !user.roles.includes('admin')) {
      return response.unauthorized(resp)
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
