// @flow

import type { RunnerConfig } from './types'
import { ConfigResolver } from './config'
const L = require('lodash')
const fs = require('fs-extra')
const path = require('path')
const resolver = new ConfigResolver('.hygen.js', {
  exists: fs.exists,
  // $FlowFixMe
  load: f => Promise.resolve(require(f))
})
module.exports = async (config: RunnerConfig): Promise<RunnerConfig> => {
  const { cwd, templates } = config
  const fileConfig = await resolver.resolve(cwd)

  const resolvedTemplates =
    L.find([process.env.HYGEN_TMPLS, path.join(cwd, '_templates')], _ =>
      fs.existsSync(_)
    ) || templates

  return { ...config, templates: resolvedTemplates, ...fileConfig }
}
