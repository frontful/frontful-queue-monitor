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
      waiting: 'Waiting',
      warning: 'Warning',
    },
  },
  filters: {
    dateStart: 'Date start',
    dateEnd: 'Date end',
    job: 'Job',
    status: 'Status',
    state: {
      part0: 'Contains (in state)',
      part1: 'and',
      part2: 'and',
      part3: 'and',
      part4: 'and',
      part5: 'and',
    },
    filter: 'Filter',
    clear: 'Clear',
  },
  jobs: {
    table: {
      name: 'Job',
      created: 'Created',
      task: 'Tasks',
      status: 'Status',
      modified: 'Modified',
    },
    tabs: {
      message_xml: 'Message.xml',
      message_json: 'Message.json',
      state_json: 'State.json',
    },
    actions: {
      save: 'Save',
      resend: 'Resend',
      retry: 'Retry',
    },
  },
  ...browserConfig.content,
})

function date(date) {
  return moment.utc(date).utcOffset(browserConfig.utcOffset).format('YY.MM.DD HH:mm:ss')
}

function time(date) {
  return moment.utc(date).utcOffset(browserConfig.utcOffset).format('HH:mm:ss')
}

function txt(path) {
  return content.get(path) || `[${path}]`
}

export {
  txt,
  date,
  time,
}
