import User from '../models/user'
import Auth from '../lib/auth'

export default {

  create (req, resp) {
    let query = User.findOne({email: req.body.email})
    query.exec()
      .then((user) => {
        Auth.createToken(user, req.body.password)
          .then((session) => resp.json(session))
          .catch((error) => resp.send(error))
      })
      .catch((error) => resp.send(error))
  },

  show () {

  }

}
