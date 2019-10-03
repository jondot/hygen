// @flow

import type { RunnerConfig } from 'src/v4/types'
import path from 'path'
import { ConfigResolver } from 'src/v4/config'

const fs = require('fs-extra')
const configResolver = new ConfigResolver('.hygen.js', {
  exists: fs.exists,
  // $FlowFixMe
  load: f => Promise.resolve(require(f)),
  none: f => ({}),
})
module.exports = async (config: RunnerConfig): Promise<RunnerConfig> => {
  const { cwd, templates } = config

  const resolvedTemplates =
    [process.env.HYGEN_TMPLS, path.join(cwd, '_templates')].find(
      _ => _ && fs.existsSync(_),
    ) || templates

  return {
    ...config,
    templates: resolvedTemplates,
    ...(await configResolver.resolve(cwd)),
  }
}
