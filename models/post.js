import db from 'mongoose'
const Schema = db.Schema

const postSchema = new Schema({
  title: String,
  body: String,
  summary: String,
  date: { type: Date, default: Date.now },
  published: Boolean,
  slug: { type: String, unique: true, index: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

export default db.model('Post', postSchema)
