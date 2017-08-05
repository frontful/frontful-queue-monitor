import {model} from 'frontful-model'
import {action} from 'mobx'

@model({
  count: 100,
  page: 1,
  search: '',
})
export class Jobs {
  next = action(() => {
    const page = this.page += 1
    this.page = page
  })

  prev = action(() => {
    const page = this.page > 1 ? this.page - 1 : this.page
    this.page = page
  })

  find = action((search) => {
    this.page = 1
    this.search = search
  })
}
