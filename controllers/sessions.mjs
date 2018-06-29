import User from '../models/user'
import Auth from '../lib/auth'

export default {

  async create (req, resp) {
    const user = await User.findOne({email: req.body.email})
    try {
      const session = await Auth.createToken(user, req.body.password)
      resp.json(session)
    } catch (error) {
      resp.send(error)
    }
  }

}
