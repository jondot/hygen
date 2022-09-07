import path from 'path'
import fs from 'fs-extra'
import type { RunnerConfig } from './types'
import { ConfigResolver } from './config'

const configResolver = new ConfigResolver('.hygen.js', {
  exists: fs.exists,
  load: async (f) => await import(f),
  none: (_) => ({}),
})

const resolve = (
  cwd: string,
  defaultTemplates: string | undefined,
  templatesOverride: string | undefined,
) => {
  return [
    templatesOverride && path.resolve(cwd, templatesOverride),
    process.env.HYGEN_TMPLS,
    path.resolve(cwd, '_templates'),
    path.resolve(cwd, defaultTemplates),
  ].find((_) => _ && fs.existsSync(_))
}

export default async (config: RunnerConfig): Promise<RunnerConfig> => {
  const { cwd, templates: defaultTemplates, templatesOverride } = config

  const resolvedTemplates = resolve(cwd, defaultTemplates, templatesOverride)

  return {
    ...config,
    templates: resolvedTemplates,
    ...(await configResolver.resolve(cwd)),
  }
}
