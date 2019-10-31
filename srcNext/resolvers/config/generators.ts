import { GeneratorConfig, HygenConfig, SummaryObject, UserConfig } from '../../types'
import walk from 'ignore-walk'

export const fetchGenerators = (config: HygenConfig): Promise<Partial<GeneratorConfig>> =>
  walk({
    path: config.env.ignoreFile,
    ignoreFiles: config.env.ignoreFile,
  })
    .catch(err => config.env.logger.err(`fetchGenerators: ${err}`))
    .then(files => {
      if (files.length === 0) throw new Error('No templates found');
      return files
    })
    .then(files =>
      files.reduce((found, file) => {
        const [generator, action] = file.split('/')
        found[generator] = found[generator] || {}
        found[generator][action] = found[generator][action] || []
        found[generator][action].push(file)

        return found
      }, {} as SummaryObject),
    )
    .then(summary => ({ all: summary }))
