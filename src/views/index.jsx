import style from './index.style'

import Master from './layouts/Master'
import Monitor from './pages/Monitor'
import React from 'react'
import {Router} from 'frontful-router'
import {resolver} from 'frontful-resolver'

@resolver((resolve) => {
  resolve(() => ({
    View:
      <Router>
        <Master>
          <Monitor pattern="/" />
        </Master>
      </Router>
  }))
})
@style
export default class Index extends React.PureComponent {
  render() {
    const {View} = this.props
    return <View />
  }
}
