import db from 'mongoose'
const Schema = db.Schema

const CommentSchema = new Schema({
  text: String
})

export default db.model('Comment', CommentSchema)
