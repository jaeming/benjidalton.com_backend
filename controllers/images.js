import host from '../config/host'

export default {
  async create (req, resp) {
    console.log(req.body)
    console.log(req.file)
    resp.json({
      url: `${host.url}/${req.file.path}`
    })
  }
}
