import browserConfig from 'frontful-config/browser'
import debounce from 'debounce-hashed'
import moment from 'moment'
import {JobItem} from './Job.Item'
import {QueueAPI} from './QueueAPI'
import {View} from './View'
import {action, computed} from 'mobx'
import {model, formatter} from 'frontful-model'
import {socket} from './socket'

function getFilters() {
  return {
    page: 1,
    count: 20,
    where: null,
    dateStart: moment().utc().add(1, 'days').startOf('day').valueOf(),
    dateEnd: moment().utc().startOf('day').valueOf(),
    job: '',
    state: '',
    status: '',
    tag01: '',
    tag02: '',
    tag03: '',
    tag04: '',
    tag05: '',
    tag06: '',
    tag07: '',
  }
}

@model.define(({models}) => ({
  queueAPI: models.global(QueueAPI),
  view: models.global(View),
}))
@model({
  data: {
    jobs: formatter.array(formatter.model(JobItem)),
    url: null,
  },
  query: getFilters(),
})
export class JobList {
  constructor() {
    this.query = getFilters()

    if (socket) {
      const added = debounce((id) => {
        if (this.query.page === 1 && !this.query.where) {
          if (!this.data.jobs.find((job) => job.id === id)) {
            this.queueAPI.get(`/job/${id}`).then(action((raw) => {
              this.data.jobs.unshift(raw)
              if (this.data.jobs.length > this.query.count) {
                this.data.jobs.pop()
              }
            }))
          }
        }
      }, (id) => id, 350, {immediate: false, maxWait: 1500})

      const updated = debounce((id) => {
        const job = this.data.jobs.find((job) => job.id === id)
        if (job) {
          this.queueAPI.get(`/job/${id}?_=${job.state.modified}`).then(action((raw) => {
            job.state = raw.state
            job.message = raw.message
          }))
        }
      }, (id) => id, 350, {immediate: false, maxWait: 1500})

      socket.on('job.added', added)
      socket.on('job.updated', updated)
    }
  }

  up() {
    const job = this.view.job.id && this.data.jobs.find((job) => job.id === this.view.job.id)
    if (job) {
      const index = this.data.jobs.indexOf(job)
      if (index > 0) {
        this.view.job = this.data.jobs[index - 1]
      }
    }
    else {
      if (this.data.jobs.length > 0) {
        this.view.job = this.data.jobs[0]
      }
    }
  }

  down() {
    const job = this.view.job.id && this.data.jobs.find((job) => job.id === this.view.job.id)
    if (job) {
      const index = this.data.jobs.indexOf(job)
      if (index < this.data.jobs.length - 1) {
        this.view.job = this.data.jobs[index + 1]
      }
    }
    else {
      if (this.data.jobs.length > 0) {
        this.view.job = this.data.jobs[0]
      }
    }
  }

  @computed
  get url() {
    return `/jobs?page=${this.query.page}&count=${this.query.count}`
  }

  fetch = () => {
    return this.queueAPI.post(this.url, this.query.where).then(action((jobs) => {
      this.data.url = this.url
      this.data.jobs = jobs
      return this.data.jobs
    }))
  }

  resolve = () => {
    const isFetched = this.url === this.data.url
    return Promise.resolve(isFetched ? this.data.jobs.map((job) => job) : this.fetch())
  }

  forward = action(() => {
    const page = this.query.page += 1
    this.query.page = page
  })

  back = action(() => {
    const page = this.query.page > 1 ? this.query.page - 1 : this.query.page
    this.query.page = page
  })

  clear = action(() => {
    this.query = getFilters()
    this.fetch()
  })

  search = action(() => {
    const where = {}
    where.created = {
      $between: [this.query.dateEnd  - browserConfig.utcOffset * 60 * 1000, this.query.dateStart - browserConfig.utcOffset * 60 * 1000],
    }
    if (this.query.job) {
      where.name = this.query.job
    }
    if (this.query.status) {
      where.status = this.query.status
    }
    if (this.query.state) {
      where.state = {
        $like: '%' + this.query.state.trim().replace(/\s+/gi, '%') + '%'
      }
    }

    for (let i = 1; i <= 7; i++) {
      const name = `tag0${i}`
      if (this.query[name]) {
        where[name] = this.query[name].trim()
      }
    }

    this.query.where = where
    this.query.page = 1

    this.fetch()
  })
}
