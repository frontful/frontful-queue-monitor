import browserConfig from 'frontful-config/browser'
import {dao} from 'frontful-dao'

@dao(() => ({
  url: `${browserConfig.queueUrl}/api`,
  credentials: 'include',
}))
export class QueueAPI {
}
