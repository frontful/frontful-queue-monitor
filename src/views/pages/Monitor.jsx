import Jobs from '../components/Jobs'
import React from 'react'
import Search from '../components/Search'
import {resolver} from 'frontful-resolver'
import {style} from 'frontful-style'

@resolver((resolve) => {
  resolve(() => ({
    Jobs: <Jobs />,
    Search: <Search />,
  }))
})
@style(require('./Monitor.style'))
export default class Monitor extends React.PureComponent {
  render() {
    const {style, Jobs, Search} = this.props
    return (
      <section className={style.css('monitor')}>
        <Search />
        <Jobs />
      </section>
    )
  }
}
