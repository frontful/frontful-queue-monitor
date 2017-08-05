import React from 'react'
import ReactDOM from 'react-dom'
import {Jobs} from '../../models/Jobs'
import {resolver} from 'frontful-resolver'
import {style} from 'frontful-style'

@resolver.define(({models}) => ({
  jobs: models.global(Jobs),
}))
@resolver((resolve) => {
  resolve(({jobs}) => ({
    next: jobs.next,
    prev: jobs.prev,
    page: jobs.page,
    find: jobs.find,
  }))
})
@style(require('./Search.style'))
export default class Search extends React.PureComponent {
  search = (event) => {
    if (event.key === 'Enter') {
      const {find} = this.props
      find(ReactDOM.findDOMNode(this.refs.search).value.trim())
    }
  }

  render() {
    const {style, next, prev, page} = this.props
    return (
      <div className={style.css('search')}>
        {page > 1 &&
          <span className={style.css('prev')} onClick={prev}>
            {'❮❮'}
          </span>
        }
        <span className={style.css('next')} onClick={next}>
          {'❯❯'}
        </span>
        <input placeholder="Search" onKeyPress={this.search} ref="search" />
      </div>
    )
  }
}
