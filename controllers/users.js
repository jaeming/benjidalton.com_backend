import bcrypt from 'bcryptjs'
import User from '../models/user'
import Auth from '../lib/auth'
import response from '../helpers/response'

export default {

  async index (req, resp) {
    const users = await User.find()
    resp.json(users)
  },

  async create (req, resp) {
    try {
      const params = await userParams(req.body)
      const user = await User.create(params)
      const session = await Auth.createToken(user, req.body.password)
      if (!session.authenticated) { return response.unauthorized(resp) }
      resp.json(session.token)
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
  }
}

function userParams (attr) {
  const password = bcrypt.hashSync(attr.password, 8)
  return {
    name: attr.name,
    email: attr.email,
    roles: ['commenter', 'messenger'],
    password
  }
}
