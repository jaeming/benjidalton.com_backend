import db from 'mongoose'
const Schema = db.Schema

const BannedUserSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default db.model('BannedUser', BannedUserSchema)
