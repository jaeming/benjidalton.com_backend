export default {

  index (req, resp) {
    resp.json({
      comments: [
        {
          body: 'umbrellas for rain',
          id: 1
        },
        {
          body: 'sushi is lovely',
          id: 2
        }
      ]
    })
  },
  
  show (req, resp) {
    console.log(req.params)
    resp.json({
      message: `this would be comment: ${req.params.id}`
    })
  },

  create (req, resp) {
    console.log('here we would create a comment')
    resp.json({
      params: req.body,
      message: 'created'
    })
  }
}