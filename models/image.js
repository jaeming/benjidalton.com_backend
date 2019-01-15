import db from 'mongoose'
const Schema = db.Schema

const imageSchema = new Schema({
  name: String,
  contentType: Object,
  meta: Object
})

export default db.model('Image', imageSchema)
