import Filters from '../components/Filters'
import JobDetails from '../components/Job.Details'
import JobList from '../components/Job.List'
import React from 'react'
import SplitPane from 'react-split-pane'
import {View} from '../../models/View'
import {resolver} from 'frontful-resolver'
import {style} from 'frontful-style'

@resolver.define(({models}) => ({
  view: models.global(View),
}))
@resolver((resolve) => {
  resolve(() => ({
    JobList: <JobList />,
    Filters: <Filters />,
  }))
  resolve(({view}) => ({
    JobDetails: view.job.id ? <JobDetails job={view.job} /> : null,
  }))
})
@style(require('./Monitor.style'))
export default class Monitor extends React.PureComponent {
  render() {
    const {style, JobList, Filters, JobDetails} = this.props
    return (
      <SplitPane prefixer={style.sessionStyleManager.prefixer} defaultSize={JobDetails ? '50%' : '100%'} split="vertical">
        <div className={style.css('list_view')}>
          <Filters />
          <JobList />
        </div>
        <div className={style.css('details_view')}>
          {JobDetails && <JobDetails />}
        </div>
      </SplitPane>
    )
  }
}
