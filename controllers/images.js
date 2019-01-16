import host from '../config/host'
import fs from 'fs'
import path from 'path'
import Image from '../models/image'

const authorizedClient = (req, resp) => {
  const isAllowed = host.clients.includes(req.header('origin'))
  if (isAllowed) {
    return true
  } else {
    resp.status(401).json({error: 'Not Authorized'})
    return false
  }
}

export default {
  create (req, resp) {
    if (authorizedClient(req, resp)) {
      let image = new Image({
        name: req.file.filename,
        contentType: req.body,
        meta: req.file
      })
      image.save()
      resp.json({url: `${host.url}/images/${image.name}`})
    }
  },

  async show (req, resp) {
    if (authorizedClient(req, resp)) {
      let image = await Image.findOne({name: req.params.name})
      fs.createReadStream(path.join('uploads/images/', image.name)).pipe(resp)
    }
  }
}
