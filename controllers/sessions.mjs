import jwt from 'jsonwebtoken'
import secrets from '../config/secrets'
import User from '../models/user'

export default {

  create (req, resp) {
    let query = User.findOne({email: req.params.email})
    query.exec()
      .then((user) => {
        let session = authenticate(user, req.body.password)
        resp.json(session)
      })
      .catch((error) => resp.send(error))
  },

  show () {

  },

  authenticate (user, password) {
    let passwordMatch = bcrypt.compareSync(password, user.password)
    if (passwordMatch) {
      let token = jwt.sign({id: user.id}, secrets.jwt)
      return { token }
    }
  }

}
