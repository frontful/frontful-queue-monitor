import React from 'react'
import {View} from '../../models/View'
import {resolver} from 'frontful-resolver'
import {style} from 'frontful-style'
import {txt, date, time} from '../../content'

@resolver.define(({models}) => ({
  view: models.global(View),
}))
@resolver((resolve) => {
  resolve(({job, view}) => ({
    state: job.state,
    selected: view.job && view.job.id === job.id,
    toggle() {
      if (view.job.id !== job.id) {
        view.job = job
      }
    },
  }))
})
@style(require('./Job.List.Item.style'))
export default class JobListItem extends React.PureComponent {
  render() {
    const {style, state: {tasks}, state, toggle, selected} = this.props
    return (
      <tbody className={style.css('job', selected && 'active')}>
        <tr onClick={toggle}>
          <td><div className={style.css('accent', state.status)}></div></td>
          <td>{txt(`${state.name}.name`)}</td>
          <td>{date(state.created)}</td>
          <td>{`${tasks.filter((task) => task.status === 'success' || task.status === 'warning').length}/${tasks.length}`}</td>
          <td>{txt(`enum.status.${state.status}`)}</td>
          <td>{time(state.modified)}</td>
        </tr>
      </tbody>
    )
  }
}
