import CodeMirror from 'react-codemirror'
import React from 'react'
import config from 'frontful-config/browser'
import {View} from '../../models/View'
import {resolver} from 'frontful-resolver'
import {saveAs} from 'file-saver'
import {style} from 'frontful-style'
import {txt, date, time} from '../../content'

const mapping = {
  message_xml: {
    file: 'message.xml',
    type: 'xml',
  },
  message_json: {
    file: 'message.json',
    type: 'json',
  },
  state_json: {
    file: 'state.json',
    type: 'json',
  },
}

@resolver.define(({models}) => ({
  view: models.global(View),
}))
@resolver((resolve) => {
  resolve(({job, view}) => ({
    state: job.state,
    resend: job.resend,
    retry: job.retry,
    viewMessage: view.viewMessage,
    setXml(xml) {job.message.xml = xml},
    setJson(json) {job.message.json = json},
    toggleMessage(viewMessage) {view.viewMessage = viewMessage},
  }))
  resolve(({job}) => ({
    message: {
      xml: job.message.xml,
      json: job.message.json,
    },
  }))
})
@style(require('./Job.Details.style'))
export default class JobDetails extends React.PureComponent {
  state = {
    isEditable: false
  }

  toggleEditable = () => {
    if (!this.state.isEditable) {
      if (window.confirm('Start message editing?')) {
        this.setState({isEditable: !this.state.isEditable})
      }
    }
    else {
      this.setState({isEditable: !this.state.isEditable})
    }
  }

  save = () => {
    saveAs(
      new Blob(
        [this.refs.editor.getCodeMirror().getValue()],
        {type: `application/${mapping[this.props.viewMessage].type};charset=utf-8`}
      ),
      mapping[this.props.viewMessage].file
    )
  }

  resend = () => {
    try {
      if (window.confirm(`Resend "${txt(`${this.props.state.name}.name`)}"?`)) {
        if (window.confirm(`"${txt(`${this.props.state.name}.name`)}" will be resent!`)) {
          const message = this.refs.editor.getCodeMirror().getValue()
          this.props.resend(mapping[this.props.viewMessage].type === 'json' ? JSON.parse(message) : message).then(() => {
            this.setState({isEditable: false})
          }).catch((error) => {
            alert(`Sending message failed: ${error.toString()}`)
          })
        }
      }
    }
    catch(error) {
      alert(`Sending message failed: ${error.toString()}`)
    }
  }

  retry = () => {
    try {
      if (window.confirm(`Retry "${txt(`${this.props.state.name}.name`)}" processing?`)) {
        if (window.confirm(`"${txt(`${this.props.state.name}.name`)}" will retry processing!`)) {
          this.props.retry().then(() => {
          }).catch((error) => {
            alert(`Sending message failed: ${error.toString()}`)
          })
        }
      }
    }
    catch(error) {
      alert(`Sending message failed: ${error.toString()}`)
    }
  }

  render() {
    const {style, state: {tasks}, state, message, setXml, setJson, toggleMessage, viewMessage} = this.props
    const canEdit = state.status === 'success' || state.status === 'error' || state.status === 'warning'
    return (
      <table className={style.css('job_details')}>
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
        <tbody className={style.css('job')}>
          {tasks.map((task, idx) => (
            <tr key={idx}>
              {!idx &&
                <td rowSpan={tasks.length}>
                  <div className={style.css('accent', state.status)}></div>
                </td>
              }
              <td>{!idx && txt(`${state.name}.name`)}</td>
              <td>{!idx && date(state.created)}</td>
              <td>{tasks.length > 1 && `${idx + 1}. `}{txt(`${state.name}.task.${task.name}`)}</td>
              <td>{txt(`enum.status.${task.status}`)}</td>
              <td>{task.modified && time(task.modified)}</td>
            </tr>
          ))}
          {!!state.status_details &&
            <tr>
              <td colSpan="6" className={style.css('details')}>
                <pre className={style.css('status_details', state.status)}>
                  {state.status_details}
                </pre>
              </td>
            </tr>
          }
          <tr>
            <td colSpan="6" className={style.css('details')}>
              <div className={style.css('tabs')}>
                {[config.xml && 'message_xml', 'message_json', 'state_json'].map((message) => (
                  message ? <div key={message} className={style.css('tab', viewMessage === message && 'active')} onClick={toggleMessage.bind(null, message)}>
                    {txt(`jobs.tabs.${message}`)}
                    {canEdit && message !== 'state_json' &&
                      <span>
                        &nbsp;
                        <span onClick={this.toggleEditable} className={style.css('is_editable_toggle')}>
                          {this.state.isEditable ? '(edit)' : '(view)'}
                        </span>
                      </span>
                    }
                  </div> : null
                ))}
                <div onClick={this.save} className={style.css('button')}>
                  {txt(`jobs.actions.save`)}
                </div>
                {viewMessage !== 'state_json' && this.state.isEditable && canEdit &&
                  <div onClick={this.resend} className={style.css('button')}>
                    {txt(`jobs.actions.resend`)}
                  </div>
                }
                {this.props.state.status === 'error' && viewMessage === 'state_json' &&
                  <div onClick={this.retry} className={style.css('button')}>
                    {txt(`jobs.actions.retry`)}
                  </div>
                }
              </div>
              <div>
                {config.xml && viewMessage === 'message_xml' &&
                  <CodeMirror
                    className={style.css('editor')}
                    value={message.xml}
                    onChange={setXml}
                    ref="editor"
                    options={{
                      mode: 'application/xml',
                      lineNumbers: true,
                      readOnly: !(canEdit && this.state.isEditable),
                    }}/>
                }
                {viewMessage === 'message_json' &&
                  <CodeMirror
                    className={style.css('editor')}
                    value={message.json}
                    onChange={setJson}
                    ref="editor"
                    options={{
                      mode: 'application/ld+json',
                      lineNumbers: true,
                      readOnly: !(canEdit && this.state.isEditable),
                    }}/>
                }
                {viewMessage === 'state_json' &&
                  <CodeMirror
                    className={style.css('viewer')}
                    value={JSON.stringify(state, null, 2)}
                    ref="editor"
                    options={{
                      mode: 'application/ld+json',
                      lineNumbers: true,
                      readOnly: true,
                    }}/>
                }
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  componentDidUpdate() {
    if (this.refs.editor) {
      if (this.props.viewMessage === 'state_json') {
        this.refs.editor.getCodeMirror().setValue(JSON.stringify(this.props.state, null, 2))
      }
      else {
        if (this.refs.editor.getCodeMirror().getValue() !== this.props.message[mapping[this.props.viewMessage].type]) {
          this.refs.editor.getCodeMirror().setValue(this.props.message[mapping[this.props.viewMessage].type])
        }
      }
    }
  }
}
