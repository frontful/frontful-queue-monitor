import moment from 'moment'
import objectPath from 'object-path'
import browserConfig from 'frontful-config/browser'

const content = objectPath({
  enum: {
    status: {
      success: 'Success',
      error: 'Error',
      queued: 'Queued',
      processing: 'Processing',
    },
  },
  job: {
    table: {
      name: 'Job',
      created: 'Created',
      task: 'Task',
      status: 'Status',
      modified: 'Modified',
    }
  },
  ...browserConfig.content,
})

function date(date) {
  return moment.utc(date).utcOffset(browserConfig.utcOffset).format('YY.MM.DD HH:mm:ss')
}

function txt(path) {
  return content.get(path) || `[${path}]`
}

export {
  txt,
  date,
}
