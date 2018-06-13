import db from 'mongoose'
const Schema = db.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  admin: Boolean
})

export default db.model('User', userSchema)
