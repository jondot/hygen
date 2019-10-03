import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const templatesResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preTemplates hooks
  // load all templates in config.generator.template_files
  // parse frontmatter from each using helpers, params, namer
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: templatesResolver,
  name: 'Templates Resolver',
  hooks: ['preTemplates', 'postTemplates'],
}

export default templatesResolver
