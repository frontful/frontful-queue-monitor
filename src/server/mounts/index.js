import environment from 'frontful-environment'
import express from 'express'
import main from './main'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use('/', main)
app.use(environment.error.getHandler())

export default app
