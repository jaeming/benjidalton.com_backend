import bcrypt from 'bcryptjs'
import User from '../models/user'

export default {

  index (req, resp) {
    let query = User.find()
    query.exec()
      .then((comments) => resp.json(comments))
      .catch((error) => resp.send(error))
  },

  create (req, resp) {
    let user = User.create(this.userParams(req.body))
    resp.json(user)
  },

  update () {

  },

  userParams (attr) {
    return {
      name: attr.name,
      email: attr.email,
      admin: true,
      password: bcrypt.hashSync(attr.password, 8)
    }
  }

}
