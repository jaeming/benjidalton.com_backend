import Image from '../models/image'

export default {
  create (req, resp) {
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
