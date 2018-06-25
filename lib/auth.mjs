import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import secrets from '../config/secrets'

export default {
  async createToken (user, password) {
    try {
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (passwordMatch) {
        return jwt.sign({id: user.id}, secrets.token)
      } else {
        console.log('password does not match')
      }
    } catch (err) {
      console.log(err)
    }
  },

  async verify (header) {
    if (!header) {
      return false
    }
    let token = header.replace('Bearer ', '')
    try {
      let decoded = await jwt.verify(token, secrets.token)
      console.log(decoded)
      return decoded
    } catch (err) {
      console.log(err)
    }
  }
}
