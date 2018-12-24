import bcrypt from 'bcryptjs'
import User from '../models/user'

export default {

  async index (req, resp) {
    const users = await User.find()
    resp.json(users)
  },

  async create (req, resp) {
    try {
      const user = await User.create(this.userParams(req.body))
      const {id, email, name, roles} = user
      resp.json({id, email, name, roles})
    } catch (err) {
      if (err.code === 11000) {
        resp.status(500).json({error: 'User already exists'})
      } else {
        resp.status(500).json({error: err})
      }
    }
  },

  update () {
    // todo
  },

  userParams (attr) {
    return {
      name: attr.name,
      email: attr.email,
      roles: ['commenter'],
      password: bcrypt.hashSync(attr.password, 8)
    }
  }

}
