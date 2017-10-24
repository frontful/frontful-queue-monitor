import browserConfig from 'frontful-config/browser'
import socketio from 'socket.io-client'
import {isBrowser} from 'frontful-utils'

let socket = null

if (isBrowser()) {
  socket = socketio(browserConfig.queueUrl, {
    path: '/queue',
  })
  socket.on('connect', () => {
    console.log('Queue connected')
  })
}

export {
  socket,
}
