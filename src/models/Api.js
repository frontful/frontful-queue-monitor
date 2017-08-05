import browserConfig from 'frontful-config/browser'
import {dao} from 'frontful-dao'

@dao(() => ({
  url: browserConfig.api,
}))
export class Api {
}
