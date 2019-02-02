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

  async create (req, resp) {
    const songs = req.files.map((file) => {
      const params = this.songParams(file)
      let song = new Song(params)
      return song.save()
    })
    try {
      const uploads = await Promise.all(songs)
      resp.json(uploads)
    } catch (error) {
      resp.status(500).json({error})
    }
  },

  songParams (file) {
    return {
      slug: helpers.slugify(file.originalname),
      name: file.originalname,
      contentType: file.mimetype,
      size: file.size,
      url: file.location
    }
  }
}
