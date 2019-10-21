import path from 'path'
import fs from 'fs-extra'
import { RunnerConfig } from './types'
import { ConfigResolver } from './config'

const configResolver = new ConfigResolver('.hygen.js', {
  exists: fs.exists,
  // $FlowFixMe
  load: f => Promise.resolve(require(f)),
  none: _ => ({}),
})

export default async (config: RunnerConfig): Promise<RunnerConfig> => {
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
