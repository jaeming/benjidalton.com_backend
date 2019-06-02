import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import secrets from '../config/secrets'
import response from '../helpers/response'

const Auth = {
  async createToken (user, password) {
    try {
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        console.log('password does not match')
        return { authenticated: false }
      }
      const { id, name, email, roles } = user
      return {
        authenticated: true,
        token: jwt.sign({ id, name, email, roles }, secrets.token)
      }
    } catch (err) {
      console.log(err)
    }
  },

  verify (header) {
    if (!header) { return false }
    let token = header.replace('Bearer ', '')
    try {
      return jwt.verify(token, secrets.token)
    } catch (err) {
      console.log(err)
    }
  },

  user (req, res, next) {
    const user = Auth.verify(req.headers.authorization)
    if (user) {
      Object.assign(req, { user })
      next()
    } else {
      return response.unauthorized(res)
    }
  }
}

export default Auth
