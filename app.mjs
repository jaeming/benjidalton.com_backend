import express from 'express'
import routes from './config/routes'
import database from './config/database'
import parser from 'body-parser'

database.init()

const app = express()
let port = process.env.PORT || 3000

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(parser.json())

app.listen(port, () => {
  console.log('server started...happy hunting')
})

const router = routes.init()
app.use('/api', router)
