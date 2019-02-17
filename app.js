import dotenv from './config/dotenv'
import express from 'express'
import router from './routes'
import database from './config/database'
import parser from 'body-parser'
import cors from 'cors'

database.init()

const app = express()
let port = process.env.PORT || 3000

app.use(cors())

app.use(parser.json())

app.listen(port, () => {
  console.log('server started...happy hunting')
})

app.use('/', router)
