import DatePicker from 'react-datepicker'
import React from 'react'
import browserConfig from 'frontful-config/browser'
import moment from 'moment'
import {JobList} from '../../models/Job.List'
import {resolver} from 'frontful-resolver'
import {style} from 'frontful-style'
import {txt} from '../../content'

@resolver.define(({models}) => ({
  jobs: models.global(JobList),
}))
@resolver((resolve) => {
  resolve(({jobs}) => ({
    forward: jobs.forward,
    back: jobs.back,
    showForward: jobs.data.jobs.length >= jobs.query.count,
    showBack: jobs.query.page > 1,
    showClear: !!jobs.query.where,
    search: jobs.search,
    clear: jobs.clear,
    query: jobs.query,
    filters: {
      dateStart: jobs.query.dateStart,
      dateEnd: jobs.query.dateEnd,
      job: jobs.query.job,
      state: jobs.query.state.map((state) => state),
      status: jobs.query.status,
      tag01: jobs.query.tag01,
      tag02: jobs.query.tag02,
      tag03: jobs.query.tag03,
      tag04: jobs.query.tag04,
      tag05: jobs.query.tag05,
      tag06: jobs.query.tag06,
      tag07: jobs.query.tag07,
    }
  }))
})
@style(require('./Filters.style'))
export default class Filters extends React.PureComponent {
  render() {
    const {style, forward, back, showForward, showBack, filters, query, search, clear, showClear} = this.props
    return (
      <div className={style.css('filters')}>
        <table>
          <tbody>
            <tr>
              <td className={style.css('title')}>
                <div>{txt(`filters.dateStart`)}</div>
              </td>
              <td>
                <DatePicker
                  readOnly
                  selected={moment(filters.dateStart).utc()}
                  onChange={(date) => {
                    query.dateStart = date.utc().valueOf()
                    search()
                  }}
                  showTimeSelect
                  dateFormat="YYYY-MM-DD HH:mm"
                />
              </td>
            </tr>
            <tr>
              <td className={style.css('title')}>
                <div>{txt(`filters.dateEnd`)}</div>
              </td>
              <td>
                <DatePicker
                  readOnly
                  selected={moment(filters.dateEnd).utc()}
                  onChange={(date) => {
                    query.dateEnd = date.utc().valueOf()
                    search()
                  }}
                  showTimeSelect
                  dateFormat="YYYY-MM-DD HH:mm"
                />
              </td>
            </tr>
            <tr>
              <td className={style.css('title')}>
                <div>{txt(`filters.job`)}</div>
              </td>
              <td>
                <select value={filters.job} onChange={(event) => {
                  query.job = event.target.value
                  search()
                }}>
                  <option></option>
                  {Object.keys(browserConfig.content).map((key) => (
                    <option key={key} value={key}>{txt(`${key}.name`)}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className={style.css('title')}>
                <div>{txt(`filters.status`)}</div>
              </td>
              <td>
                <select value={filters.status} onChange={(event) => {
                  query.status = event.target.value
                  search()
                }}>
                  <option></option>
                  {Object.keys(txt('enum.status')).map((key) => (
                    <option key={key} value={key}>{txt(`enum.status.${key}`)}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            {filters.state.map((state, idx) => (
              <tr key={`state_${idx}`}>
                <td className={style.css('title')}>
                  <div>{txt(`filters.state.part${idx}`)}</div>
                </td>
                <td>
                  <input value={state} onChange={(event) => {query.state[idx] = event.target.value}}></input>
                </td>
              </tr>
            ))}
            {browserConfig.tags.map((tag) => (
              <tr key={tag.name}>
                <td className={style.css('title')}>
                  <div>{tag.title}</div>
                </td>
                <td>
                  {tag.options ?
                    <select value={filters[tag.name]} onChange={(event) => {query[tag.name] = event.target.value}}>
                      <option></option>
                      {tag.options.map((key) => (
                        <option key={key} value={key}>{key}</option>
                      ))}
                    </select>
                    :
                    <input value={filters[tag.name]} onChange={(event) => {query[tag.name] = event.target.value}}></input>
                  }
                </td>
              </tr>
            ))}
            <tr>
              <td>
              </td>
              <td colSpan="2" className={style.css('buttons')}>
                <button onClick={search} className={style.css('back')}>{txt(`filters.filter`)}</button>
                <button onClick={clear} className={style.css('forward')} disabled={!showClear}>{txt(`filters.clear`)}</button>
              </td>
            </tr>
            <tr>
              <td>
              </td>
              <td colSpan="2" className={style.css('buttons')}>
                <button onClick={back} className={style.css('back')} disabled={!showBack}>{'<<'}</button>
                <button onClick={forward} className={style.css('forward')} disabled={!showForward}>{'>>'}</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{clear: 'both'}}></div>
      </div>
    )
  }
}
