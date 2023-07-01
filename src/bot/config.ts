type Config = {
  token: string
  guild: string
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const config = require('../../config.json') as Config
