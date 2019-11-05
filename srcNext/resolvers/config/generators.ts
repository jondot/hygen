import { GeneratorSummaryConfig, HygenBuildConfig, SummaryObject } from '../../types'
import walk from 'ignore-walk'

export const fetchGenerators = (config: HygenBuildConfig): Promise<GeneratorSummaryConfig> =>
  Promise.all(config.env.templates.map(templatePath => {
      config.tools.logger.notice(`Scanning ${templatePath}`)
      return walk({
        path: templatePath,
        ignoreFiles: config.env.ignoreFile,
      })
    },
  ))
    .catch(err => {
      config.tools.logger.err(`fetchGenerators: ${err}`)
      throw err
    })
    .then((files: Array<Array<string>>) => [].concat(...files))
    .then(files => {
      if (files.length === 0) throw new Error('No templates found')
      return files
    })
    .catch(err => {
      console.error('noTemplates', err)
      throw new Error(err)
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
    .then(summary => ({ summary }) as GeneratorSummaryConfig)
