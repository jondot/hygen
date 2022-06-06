import path from 'path'
import fs from 'fs-extra'
import type { RunnerConfig } from './types'
import { ConfigResolver } from './config'

const configResolver = new ConfigResolver('.hygen.js', {
  exists: fs.exists,
  load: async (f) => await import(f),
  none: (_) => ({}),
})

export default async (config: RunnerConfig): Promise<RunnerConfig> => {
  const { cwd, templates } = config

  const resolvedTemplates =
    templates ||
    [process.env.HYGEN_TMPLS, path.join(cwd, '_templates')].find(
      (_) => _ && fs.existsSync(_),
    )

  return {
    ...config,
    templates: resolvedTemplates,
    ...(await configResolver.resolve(cwd)),
  }
}
