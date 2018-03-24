// @flow

import type { RunnerConfig } from './types'
import { ConfigResolver } from './config'
const L = require('lodash')
const fs = require('fs-extra')
const configResolver = new ConfigResolver('.hygen.js', {
  exists: fs.exists,
  // $FlowFixMe
  load: f => Promise.resolve(require(f)),
  none: f => ({})
})
const templateResolver = new ConfigResolver('_templates', {
  exists: fs.exists,
  // $FlowFixMe
  load: f => f,
  none: f => null
})
module.exports = async (config: RunnerConfig): Promise<RunnerConfig> => {
  const { cwd, templates } = config

  const resolvedTemplates =
    L.find(
      [process.env.HYGEN_TMPLS, await templateResolver.resolve(cwd)],
      _ => _ && fs.existsSync(_)
    ) || templates

  return {
    ...config,
    templates: resolvedTemplates,
    ...(await configResolver.resolve(cwd))
  }
}
