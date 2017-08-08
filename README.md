# <a href="https://github.com/frontful/frontful-queue-monitor"><img heigth="75" src="http://www.frontful.com/assets/packages/queue-monitor.png" alt="Frontful Queue Monitor" /></a>

`frontful-queue-monitor` is job and task monitor for [`frontful-queue`](https://github.com/frontful/frontful-queue) message queue micro service to overview and filter messages, view message details including its full state (as well as edit and resend messages in the future).


### Configuration

Configuration is done `config.js` file and it can be modified or replaced after production build.

- **`common.api`** - `frontful-queue` API url e.g. `http://localhost:7010/api`.
- **`common.utcOffset`** - Time offset in minutes for time to be rendered the same on server and client.
- **`common.content`** - Text content keys and values, used to add mapping between job and task names to their descriptions.

### Installation

```shell
# install yarn package manager
npm install yarn -g
# install dependencies
yarn install
```

### Development

1. [Install dependencies](https://github.com/frontful/frontful-queue#installation)
2. `yarn start` to start application ([http://localhost:7015](http://localhost:7015) by default)
3. Change code, application gets rebuilt and reloaded
4. Ensure that [`frontful-queue`](https://github.com/frontful/frontful-queue) service is running ([http://localhost:7010](http://localhost:7010) by default)

### Deployment

- `yarn package` to create `.zip` package.
- Move `.zip` package to host environment, and extract its content.
- [Install dependencies](https://github.com/frontful/frontful-queue#installation)
- `yarn build` to build the service
- To start the service
  - Linux - `PORT=7015 HOST=localhost node ./build/server`
  - Windows - `./node_modules/.bin/cross-env PORT=7015 HOST=localhost node ./build/server`

`HOST` environment variable is used to signal server and browser on what hostname `frontful-queue` is running and can be accessed at.

#### Linux

On Linux use any deployment strategy e.g. started directly from console, using Nginx, Passenger etc.

#### Windows

On Windows you can either start service directly from console or install it as windows service.

```shell
./node_modules/.bin/cross-env PORT=7015 HOST=localhost yarn deploy
```
