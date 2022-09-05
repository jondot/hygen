import path from 'path'
import fs from 'fs-extra'
import type { RunnerConfig } from './types'
import { ConfigResolver } from './config'

const configResolver = new ConfigResolver('.hygen.js', {
  exists: fs.exists,
  load: async (f) => await import(f),
  none: (_) => ({}),
})

const resolve = (cwd: string, templates: string | undefined) => {
  return [
    path.resolve(cwd, templates),
    process.env.HYGEN_TMPLS,
    path.resolve(cwd, '_templates'),
  ].find((_) => _ && fs.existsSync(_))
}

export default async (config: RunnerConfig): Promise<RunnerConfig> => {
  const { cwd, templates } = config

  const resolvedTemplates = resolve(cwd, templates)

  return {
    ...config,
    templates: resolvedTemplates,
    ...(await configResolver.resolve(cwd)),
  }
}
