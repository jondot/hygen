import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const renderResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preRender hooks
  // resolve preTemplates hooks
  // load all templates in config.generator.template_files
  // parse frontmatter from each
  // assign actions based on frontmatter directives: inject,write,sh,message
  //   ejs templates will use the following in template context
  //     helpers, params, namer, and frontmatter
  // resolve postTemplates hooks

  // resolve postRender hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: renderResolver,
  name: 'Render Resolver',
  hooks: ['preRender', 'postRender'],
}

export default renderResolver

import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const templatesResolver = (config: HygenConfig): Promise<HygenConfig> => {
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: templatesResolver,
  name: 'Templates Resolver',
  hooks: ['preTemplates', 'postTemplates'],
}

export default templatesResolver
