import response from '../helpers/response'

export default {
  check (roles) {
    return function (req, res, next) {
      const authorized = roles.every(role => req.user.roles.includes(role))
      if (authorized) next()
      else return response.unauthorized(res)
    }
  }
}
