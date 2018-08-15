import dotenv from 'dotenv'
import express from 'express'
import routes from './config/routes'
import database from './config/database'
import parser from 'body-parser'
import cors from 'cors'

dotenv.config()
database.init()

const app = express()
let port = process.env.PORT || 3030

app.use(cors())

app.use(parser.json())

app.listen(port, () => {
  console.log('server started...happy hunting')
})

const router = routes.init()
app.use('/api', router)
