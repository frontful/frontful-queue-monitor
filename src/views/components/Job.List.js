import JobListItem from './Job.List.Item'
import React from 'react'
import {JobList as JobListModel} from '../../models/Job.List'
import {resolver} from 'frontful-resolver'
import {style} from 'frontful-style'
import {txt} from '../../content'

@resolver.define(({models}) => ({
  jobList: models.global(JobListModel),
}))
@resolver((resolve) => {
  resolve(({jobList}) => ({
    jobList: jobList.resolve().then((jobListItems) => {
      return resolve.value(jobListItems.map((jobItem) => resolve.value({
        key: jobItem.id,
        View: <JobListItem job={jobItem} />,
      })))
    }),
    up() {
      jobList.up()
    },
    down() {
      jobList.down()
    }
  }))
})
@style(require('./Job.List.style'))
export default class JobList extends React.PureComponent {
  state = {
    isFocused: false
  }

  onFocus = () => {
    this.setState({isFocused: true})
  }
  onBlur = () => {
    this.setState({isFocused: false})
  }

  onKeyDown = (event) => {
    if (this.state.isFocused) {
      if (event.key === 'ArrowDown') {
        this.props.down()
      }
      else if (event.key === 'ArrowUp') {
        this.props.up()
      }
    }
  }

  render() {
    const {style, jobList} = this.props
    return (
      <table className={style.css('job_list')} tabIndex="1" onFocus={this.onFocus} onBlur={this.onBlur} onKeyDown={this.onKeyDown}>
        <colgroup>
          <col width="1"></col>
          <col width="1"></col>
          <col width="1"></col>
          <col width="1"></col>
          <col width="1"></col>
        </colgroup>
        <thead>
          <tr>
            <td></td>
            <td>{txt('jobs.table.name')}</td>
            <td>{txt('jobs.table.created')}</td>
            <td>{txt('jobs.table.task')}</td>
            <td>{txt('jobs.table.status')}</td>
            <td>{txt('jobs.table.modified')}</td>
          </tr>
        </thead>
        {jobList.map((jobListItem) => (
          <jobListItem.View key={jobListItem.key} />
        ))}
      </table>
    )
  }
}
