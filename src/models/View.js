import config from 'frontful-config/browser'
import debounce from 'debounce-hashed'
import {JobItem} from './Job.Item'
import {QueueAPI} from './QueueAPI'
import {action} from 'mobx'
import {model, formatter} from 'frontful-model'
import {socket} from './socket'

@model.define(({models}) => ({
  queueAPI: models.global(QueueAPI),
}))
@model({
  viewMessage: config.xml ? 'message_xml' : 'message_json',
  job: formatter.model(JobItem),
})
export class View {
  constructor() {
    if (socket) {
      const update = debounce((id) => {
        if (this.job && this.job.id === id) {
          this.queueAPI.get(`/job/${id}?_=${this.job.state.modified}`).then(action((rawJob) => {
            if (this.job.id === rawJob.state.id) {
              this.job.state = rawJob.state
              this.job.message = rawJob.message
            }
          }))
        }
      }, (id) => id, 350, {immediate: false, maxWait: 1500})
      socket.on('job.updated', update)
    }
  }
}
