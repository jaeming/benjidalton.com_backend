import User from '../models/user'
import Auth from '../lib/auth'
import response from '../helpers/response'

export default {

  async create (req, resp) {
    const user = await User.findOne({ email: req.body.email })
    if (!user) { return response.unauthorized(resp) }
    const session = await Auth.createToken(user, req.body.password)
    if (!session.authenticated) { return response.unauthorized(resp) }
    resp.json(session.token)
  }

}
