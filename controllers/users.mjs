import bcrypt from 'bcryptjs'
import User from '../models/user'

export default {

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
      password: bcrypt.hashSync(attr.password, 8)
    }
  }

}
