import React from 'react'
import {QueueAPI} from '../../models/QueueAPI'
import {resolver} from 'frontful-resolver'
import {style} from 'frontful-style'

@resolver.define(({models}) => ({
  queueAPI: models.global(QueueAPI),
}))
@resolver((resolve) => {
  resolve(
    ({queueAPI}) => ({
      status: queueAPI.resolve('/status').then(({status}) => status)
    }),
    ({status, queueAPI}) => ({
      toggle() {
        return (status === 'started' ? queueAPI.post('/status/stop') : queueAPI.post('/status/start')).then(() => {
          return queueAPI.get('/status')
        })
      }
    })
  )
})
@style(require('./Status.style'))
export default class Status extends React.PureComponent {
  render() {
    const {style, toggle, status} = this.props
    return (
      <div className={style.css('status')}>
        <span>{status === 'started' ? 'Running' : 'Stopped'}</span>
        <button onClick={toggle}>{status === 'started' ? 'Stop' : 'Start'}</button>
      </div>
    )
  }
}
