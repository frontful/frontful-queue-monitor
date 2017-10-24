import {QueueAPI} from './QueueAPI'
import {cookies, isBrowser} from 'frontful-utils'
import {model} from 'frontful-model'

@model.define(({models, req}) => ({
  req,
  queueAPI: models.global(QueueAPI),
}))
@model({})
export class Session {
  verify = () => {
    return this.queueAPI.post('/signin', {
      token: cookies(this.req).get('token'),
    }).then(() => true).catch(() => false)
  }

  signin = (password) => {
    return this.queueAPI.post('/signin', {
      token: window.btoa(password)
    })
  }

  signout = () => {
    if (isBrowser()) {
      return this.queueAPI.post('/signout')
    }
    else {
      return Promise.reject(new Error())
    }
  }
}
