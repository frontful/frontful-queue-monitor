const Service = require('node-windows').Service // eslint-disable-line
const path = require('path')

const svc = new Service({
  name: 'Frontful Queue Monitor',
  script: path.resolve(process.cwd(), './build/server/index.js'),
  description: 'Job and task monitor for message queue micro service',
  cwd: process.cwd(),
  wait: 5,
  grow: .5,
  maxRetries: 20,
  env: [
    {
      name: 'NODE_ENV',
      value: 'production',
    },
    {
      name: 'PORT',
      value: process.env.PORT || 7015,
    },
    {
      name: 'HOST',
      value: process.env.HOST || 'localhost',
    },
  ],
})

svc.on('install', () => {
  console.log(`Service ${svc.exists ? 'is' : 'is not'} installed`)
  svc.start()
})

svc.install()
