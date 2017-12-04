import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'frontful-router'
import {Session} from '../../models/Session'
import {resolver} from 'frontful-resolver'
import {style} from 'frontful-style'

@resolver.define(({models}) => ({
  session: models.global(Session),
  router: models.global(Router.Model),
}))
@resolver((resolve) => {
  resolve(({session, router}) => ({
    signin: (password) => {
      session.signin(password)
        .then(() => router.reload('/'))
        .catch(() => alert('Incorrect password'))
    }
  }))
})
@style(require('./Signin.style'))
export default class Signin extends React.PureComponent {
  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      const password = ReactDOM.findDOMNode(this.refs.password).value
      this.props.signin(password)
    }
  }

  render() {
    const {style} = this.props
    return (
      <div className={style.css('login')}>
        <input
          autoFocus
          type="password"
          ref="password"
          placeholder="Password"
          onKeyPress={this.onKeyPress}
        />
      </div>
    )
  }
}
