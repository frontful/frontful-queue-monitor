import style from './index.style'

import Master from './layouts/Master'
import Monitor from './pages/Monitor'
import React from 'react'
import Signin from './pages/Signin'
import Signout from './pages/Signout'
import Status from './pages/Status'
import {Router} from 'frontful-router'
import {Session} from '../models/Session'
import {resolver} from 'frontful-resolver'

@resolver.define(({models}) => ({
  session: models.global(Session),
}))
@resolver((resolve) => {
  resolve(
    ({session}) => ({
      verified: session.verify(),
    }),
    ({verified}) => ({
      View:
        <Router>
          <Signout pattern="/signout" />
          {verified ?
            <Master>
              <Monitor pattern="/" />
              <Status pattern="/status" />
            </Master> :
            <Master>
              <Signin pattern="*" />
            </Master>
          }
        </Router>
    })
  )
})
@style
export default class Index extends React.PureComponent {
  render() {
    return <this.props.View />
  }
}
