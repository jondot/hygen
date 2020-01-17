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
    .then(files => {
      const templates = files.filter(file => {
        const filename = file.split(config.io.path.sep).reverse()[0]
        return !(config.env.notTemplateFiles.includes(filename))
      })
      const moduleFiles = files.filter(file => {
        const filename = file.split(config.io.path.sep).reverse()[0]
        return config.env.notTemplateFiles.includes(filename)
      })
      const summary = templates.reduce((found, file) => {
        const [generator, action] = file.split(config.io.path.sep)
        found[generator] = found[generator] || {}
        found[generator][action] = found[generator][action] || {modules: [], templates: []}
        found[generator][action].templates.push(file)
        return found
      }, {} as SummaryObject)

      moduleFiles.reduce((found, file) => {
        const [generator, action] = file.split(config.io.path.sep)
        found[generator] = found[generator] || {}
        found[generator][action] = found[generator][action] || {modules: [], templates: []}
        found[generator][action].modules.push(file)
        return found
      }, summary)
      return summary
    } )
    .then(summary => ({ summary }) as GeneratorSummaryConfig)
