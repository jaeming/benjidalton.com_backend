import Message from '../models/message'
import User from '../models/user'
import Auth from '../lib/auth'
import response from '../helpers/response'
import serializer from '../serializers/message'

export default {
  async index (req, resp) {
    let user = this.user(req)
    if (!user) { return response.unauthorized(resp) }
    const messages = await Message.find({to: user.id}).populate('from')
    let json = serializer.index(messages)
    resp.json(json)
  },

  async show (req, resp) {
    let user = this.user(req)
    if (!user) { return response.unauthorized(resp) }
    const message = await Message.findOne({_id: req.params.id, to: user.id})
    resp.json(message)
  },

  async create (req, resp) {
    let user = this.user(req)
    if (!user || (user && user.banned)) { return response.unauthorized(resp) }
    let {from, subject, text, to} = req.body
    if (!to) {
      to = await User.findOne({email: process.env.SITE_OWNER})
    }
    const message = new Message({from, to, subject, text, user})
    message.save()
    resp.json(message)
  },

  async update (req, resp) {
    let user = this.user(req)
    const message = await Message.findOne({_id: req.params.id}).populate('to')
    if (user && user.id === message.to.id) {
      Object.assign(message, {read: req.body.read})
      await message.save()
      resp.json({message})
    } else {
      return response.unauthorized(resp)
    }
  },

  async delete (req, resp) {
    let user = this.user(req)
    const message = await Message.findOne({_id: req.params.id})
    if (user && user.id === message.to) {
      message.remove()
      resp.json({delete: 'ok'})
    } else {
      return response.unauthorized(resp)
    }
  },

  user (req) {
    return Auth.verify(req.headers.authorization)
  }
}
