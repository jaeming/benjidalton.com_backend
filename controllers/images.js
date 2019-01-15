import host from '../config/host'
import fs from 'fs'
import path from 'path'
import Image from '../models/image'

export default {
  create (req, resp) {
    let image = new Image({
      name: req.file.filename,
      contentType: req.body,
      meta: req.file
    })
    image.save()
    resp.json({url: `${host.url}/images/${image.name}`})
  },

  async show (req, resp) {
    let image = await Image.findOne({name: req.params.name})
    fs.createReadStream(path.join('uploads/images/', image.name)).pipe(resp)
  }
}
