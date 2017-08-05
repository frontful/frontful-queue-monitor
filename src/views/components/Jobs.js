import Job from './Job'
import React from 'react'
import {Api} from '../../models/Api'
import {Jobs} from '../../models/Jobs'
import {resolver} from 'frontful-resolver'
import {style} from 'frontful-style'
import {txt} from '../../content'

@resolver.define(({models}) => ({
  api: models.global(Api),
  jobs: models.global(Jobs),
}))
@resolver((resolve) => {
  resolve(({api, jobs}) => ({
    jobs: api.resolve(`/jobs?count=${jobs.count}&page=${jobs.page}&search=${jobs.search}`)
  }))
})
@style(require('./Jobs.style'))
export default class JobsComponent extends React.PureComponent {
  render() {
    const {style, jobs} = this.props
    return (
      <table className={style.css('jobs')}>
        <thead>
          <tr>
            <td></td>
            <td>{txt('job.table.name')}</td>
            <td>{txt('job.table.created')}</td>
            <td>{txt('job.table.task')}</td>
            <td>{txt('job.table.status')}</td>
            <td>{txt('job.table.modified')}</td>
          </tr>
        </thead>
        {jobs.map((job) => (
          <Job key={job.id} job={job} />
        ))}
      </table>
    )
  }
}
