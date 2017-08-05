import environment from 'frontful-environment'
import express from 'express'
import main from './main'

const app = express()

app.use('/', main)
app.use(environment.error.getHandler())

export default app
