import db from 'mongoose'
const Schema = db.Schema

const songSchema = new Schema({
  slug: { type: String, unique: true, index: true },
  name: String,
  contentType: Object,
  size: Number,
  url: String
})

export default db.model('Song', songSchema)
