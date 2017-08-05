import CodeMirror from 'react-codemirror'
import React from 'react'
import {style} from 'frontful-style'
import {txt, date} from '../../content'

@style(require('./Job.style'))
export default class Job extends React.PureComponent {
  state = {
    isExpanded: false
  }

  toggle = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render() {
    const {style, job} = this.props
    const tasks = job.tasks
    return (
      <tbody className={style.css('job', this.state.isExpanded && 'active')}>
        {tasks.map((task, idx) => (
          <tr key={idx} onClick={this.toggle}>
            {!idx &&
              <td rowSpan={tasks.length}>
                <div className={style.css('accent', job.status)}></div>
              </td>
            }
            <td>{!idx && txt(`${job.name}.name`)}</td>
            <td>{!idx && date(job.created)}</td>
            <td>{txt(`${job.name}.task.${task.name}`)}</td>
            <td>{txt(`enum.status.${task.status}`)}</td>
            <td>{task.modified && date(task.modified)}</td>
          </tr>
        ))}
        {this.state.isExpanded &&
          <tr>
            <td colSpan="6" className={style.css('editor')}>
              <CodeMirror value={JSON.stringify(job, null, 2)} options={{
                mode: 'application/ld+json',
                lineNumbers: true,
                readOnly: true,
              }}/>
            </td>
          </tr>
        }
      </tbody>
    )
  }
}
