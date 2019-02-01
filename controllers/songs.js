import Song from '../models/song'
import helpers from '../helpers'

export default {
  async index (req, resp) {
    let songs = await Song.find()
    resp.json(songs)
  },

  async show (req, resp) {
    let song = await Song.findOne({slug: req.params.slug})
    resp.json(song)
  },

  create (req, resp) {
    let song = new Song({
      slug: helpers.slugify(req.file.key),
      name: req.file.key,
      contentType: req.body,
      meta: req.file,
      url: req.file.location
    })
    song.save()
    resp.json({url: song.url})
  }
}
