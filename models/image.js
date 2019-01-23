import db from 'mongoose'
const Schema = db.Schema

const imageSchema = new Schema({
  name: String,
  contentType: Object,
  meta: Object,
  url: String
})

export default db.model('Image', imageSchema)
