import db from 'mongoose'
const Schema = db.Schema

const userSchema = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: String,
  roles: []
})

export default db.model('User', userSchema)
