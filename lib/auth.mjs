import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import secrets from '../config/secrets'

export default {
  createToken (user, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          let token = jwt.sign({id: user.id}, secrets.token)
          resolve({ token })
        } else {
          reject(err)
        }
      })
    })
  },

  verify (header) {
    if (!header) {
      return false
    }
    let token = header.replace('Bearer ', '')
    return new Promise((resolve, reject) => {
      jwt.verify(token, secrets.token, (error, decoded) => {
        if (decoded) {
          resolve(decoded)
        } else {
          console.log('NO TOKEN MATCH')
          reject(error)
        }
      })
    })
  }
}
