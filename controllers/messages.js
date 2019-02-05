import Message from '../models/message'
import Auth from '../lib/auth'

export default {
  async index (req, resp) {
    let user = this.user(req)
    if (user && user.roles.includes('admin')) {
      const messages = await Message.find()
      resp.json(messages)
    } else {
      return resp.status(401).json({error: 'User not Authorized'})
    }
  },

  async show (req, resp) {
    let user = this.user(req)
    if (user && user.roles.includes('admin')) {
      const message = await Message.findOne({id: req.params.id})
      resp.json(message)
    } else {
      return resp.status(401).json({error: 'User not Authorized'})
    }
  },

  async create (req, resp) {
    let user = this.user(req)
    if (!user) {
      let msg = {error: 'User not Authorized'}
      return resp.status(401).json(msg)
    }
    if (user.banned) {
      let msg = {error: 'You have been banned. Contact admin'}
      return resp.status(401).json(msg)
    }
    const {from, subject, text} = req.body
    const message = new Message({from, subject, text, user})
    message.save()
    resp.json(message)
  },

  async update (req, resp) {
    let user = this.user(req)
    if (user && user.roles.includes('admin')) {
      const message = await Message.findOne({id: req.params.id})
      Object.assign(message, {read: req.body.read})
      await message.save()
      resp.json({message})
    } else {
      return resp.status(401).json({error: 'User not Authorized'})
    }
  },

  async delete (req, resp) {
    let user = this.user(req)
    if (user && user.roles.includes('admin')) {
      await Message.findOneAndDelete({id: req.params.id})
      resp.json({delete: 'ok'})
    } else {
      return resp.status(401).json({error: 'User not Authorized'})
    }
  },

  user (req) {
    return Auth.verify(req.headers.authorization)
  }
}
