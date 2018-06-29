import db from 'mongoose'
const Schema = db.Schema

const CommentSchema = new Schema({
  text: String,
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  edited: Date
})

export default db.model('Comment', CommentSchema)
