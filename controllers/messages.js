import Message from '../models/message'
import User from '../models/user'
import response from '../helpers/response'
import serializer from '../serializers/message'

export default {
  async index (req, resp) {
    const messages = await Message.find({to: req.user.id}).populate('from')
    let json = serializer.index(messages)
    resp.json(json)
  },

  async show (req, resp) {
    const message = await Message.findOne({_id: req.params.id, to: req.user.id})
    resp.json(message)
  },

  async create (req, resp) {
    let {from, subject, text, to} = req.body
    if (!to) {
      to = await User.findOne({email: process.env.SITE_OWNER})
    }
    const message = new Message({from, to, subject, text})
    message.save()
    resp.json(message)
  },

  async update (req, resp) {
    const message = await Message.findOne({_id: req.params.id}).populate('to')
    if (message.to.equals(req.user.id)) {
      Object.assign(message, {read: req.body.read})
      await message.save()
      resp.json({message})
    } else {
      return response.unauthorized(resp)
    }
  },

  async delete (req, resp) {
    const message = await Message.findOne({_id: req.params.id}).populate('to')
    if (message.to.equals(req.user.id)) {
      message.remove()
      resp.json({delete: 'ok'})
    } else {
      return response.unauthorized(resp)
    }
  }
}
