import { HygenResolver } from '../types'
import inflect from 'inflection'
import changeCase from 'change-case'

export const resolveHelpers: HygenResolver = config => {

  config.helpers = {
    capitalize: inflect.capitalize,
    inflect,
    changeCase,
    ...(config.helpers || {})
  }

  return Promise.resolve(config)
}