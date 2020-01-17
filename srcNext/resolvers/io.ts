import { HygenResolver, IoConfig } from '../types'
import * as fs from 'fs-extra'
import * as path from 'path'

const shellFunction = (action, body) => {
  const opts = body && body.length > 0 ? { input: body } : {}
  return require('execa').shell(action, opts)
}

const asyncRequire = (pkg: string): Promise<unknown> =>
  Promise.resolve(require(pkg))
    .catch(err => {
      console.error(`Config file loading Error: ${pkg}`)
      throw err
    })

// no idea if this works yet
const defaultIoWin32 = {
  path: path.win32,
}

const defaultIoPosix: Partial<IoConfig> = {
  path: path,
}

const defaultCommonIo: Partial<IoConfig> = {
  load: asyncRequire,
  consoleWrite: (...msg: Array<unknown>): void => console.log(...msg),
  exec: shellFunction,
  none: () => Promise.resolve({}),
  exists: fs.pathExists,
}

export const resolveIo: HygenResolver = config => {
  config.io = ({
    ...(config.env.platform === 'win32' ? defaultIoWin32 : defaultIoPosix),
    ...defaultCommonIo,
    ...config.io,
  })
  return Promise.resolve(config)
}
