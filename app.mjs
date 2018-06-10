import express from 'express'
import Controllers from './controllers'
import Routes from './routes'
import parser from 'body-parser'

const app = express()
app.controllers = Controllers 
let port = process.env.PORT || 3000

// app.use(parser.urlencoded({extend: false}))
app.use(parser.json())

app.listen(port, () => {
  console.log('server started...happy hunting') 
})

const router = express.Router()
Routes.create(app, router)