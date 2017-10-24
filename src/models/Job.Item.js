import {model} from 'frontful-model'
import {QueueAPI} from './QueueAPI'

@model.define(({models}) => ({
  queueAPI: models.global(QueueAPI),
}))
@model({
  id: null,
  state: null,
  message: {
    xml: '',
    json: '',
  },
})
export class JobItem {
  resend = (message) => {
    return this.queueAPI.post(`/job/${this.id}/restart`, message)
  }

  retry = () => {
    return this.queueAPI.post(`/job/${this.id}/retry`)
  }
}
