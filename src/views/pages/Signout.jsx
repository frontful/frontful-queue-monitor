import React from 'react'
import {Router} from 'frontful-router'
import {Session} from '../../models/Session'
import {resolver} from 'frontful-resolver'

@resolver.define(({models}) => ({
  session: models.global(Session),
  router: models.global(Router.Model),
}))
@resolver((resolve) => {
  resolve.untracked(({session, router}) => {
    session.signout()
      .then(() => {router.reload('/')})
      .catch(() => {})
  })
})
export default class Signout extends React.PureComponent {
  render() {
    return null
  }
}
