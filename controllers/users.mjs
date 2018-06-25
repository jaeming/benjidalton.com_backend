import bcrypt from 'bcryptjs'
import User from '../models/user'

export default {

  async index (req, resp) {
    const users = await User.find()
    resp.json(users)
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
