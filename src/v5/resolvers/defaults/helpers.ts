import { HygenResolver } from '../../hygen'
import * as inflection from 'inflection'
import * as changeCase from 'change-case'

// supports kebab-case to KebabCase
// @ts-ignore
inflection.undasherize = str =>
  str
    .split(/[-_]/)
    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('')

export const helpersResolver: HygenResolver = config => {
  config.helpers = {
    ...config.helpers,
    capitalize: changeCase.ucFirst,
    inflection,
    changeCase: changeCase,
  }
  return Promise.resolve(config)
}


export default helpersResolver
