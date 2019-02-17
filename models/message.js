import db from 'mongoose'
const Schema = db.Schema

const MessageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  text: String,
  read: {type: Boolean, default: false},
  created: { type: Date, default: Date.now() }
})

export default db.model('Message', MessageSchema)
