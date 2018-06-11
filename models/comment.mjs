import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  text: String
})

export default mongoose.model('Comment', CommentSchema)
