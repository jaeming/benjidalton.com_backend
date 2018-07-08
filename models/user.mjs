import db from 'mongoose'
const Schema = db.Schema

const userSchema = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: String,
  admin: Boolean
})

export default db.model('User', userSchema)
