import { contact } from '../lib/contact'
import response from '../helpers/response'

export default {
  async create (req, resp) {
    try {
      const {from, subject, text} = req.body
      await contact(from, subject, text)
      resp.json({msg: 'sent'})
    } catch (error) {
      return response.error(resp, error)
    }
  }
}
