// @flow

import { RunnerConfig } from './types'
const L = require('lodash')
const fs = require('fs-extra')
const path = require('path')
module.exports = (config: RunnerConfig): RunnerConfig => {
  const { cwd, templates } = config
  const resolvedTemplates =
    L.find(
      [
        path.join(cwd, process.env.HYGEN_TMPLS || '_templates'),
        path.join(cwd, '_templates')
      ],
      _ => fs.existsSync(_)
    ) || templates
  return { ...config, templates: resolvedTemplates }
}
