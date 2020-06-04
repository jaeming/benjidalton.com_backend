import mongoose from 'mongoose'

export default {
  init () {
    mongoose.connect(process.env.DB_HOST)
    mongoose.set('useCreateIndex', true)
    mongoose.Promise = global.Promise
    let db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
  }
}
