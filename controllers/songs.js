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
      const params = songParams(file)
      let song = new Song(params)
      return song.save()
    })
    try {
      const uploads = await Promise.all(songs)
      resp.json(uploads)
    } catch (error) {
      resp.status(500).json({error})
    }
  }
}

function songParams (file) {
  const slug = helpers.slugify(file.originalname).replace('mp3', '')
  return {
    slug,
    name: file.originalname,
    contentType: file.mimetype,
    size: file.size,
    url: file.location
  }
}
