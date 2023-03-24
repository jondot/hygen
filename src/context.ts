import type { RunnerConfig } from './types'
import helpers from './helpers'

const localsToCapitalize = ['name']
const localsToPluralize = ['name']
const localsDefaults = {
  name: 'unnamed',
}

const processLocals = (hsh, [key, value]) => {
  hsh[key] = value

  if (localsToCapitalize.includes(key)) {
    hsh[helpers.capitalize(key)] = helpers.capitalize(value)
  }

  if (localsToPluralize.includes(key)) {
    hsh[helpers.inflection.pluralize(key)] = helpers.inflection.pluralize(value)
    hsh[
      helpers.capitalize(helpers.inflection.pluralize(key))
    ] = helpers.capitalize(helpers.inflection.pluralize(value))
  }

  return hsh
}

const processedLocals = (locals: any) =>
  Object.entries(locals).reduce(processLocals, {})

const context = (locals: any, config: RunnerConfig = {}) => {
  const configLocalsDefaults =
    (config &&
      (typeof config.localsDefaults === 'function'
        ? config.localsDefaults(locals, config)
        : config.localsDefaults)) ||
    {}

  const localsWithDefaults = {
    ...localsDefaults,
    ...configLocalsDefaults,
    ...locals,
  }

  const configHelpers =
    (config &&
      (typeof config.helpers === 'function'
        ? config.helpers(locals, config)
        : config.helpers)) ||
    {}

  return Object.assign(
    localsWithDefaults,
    processedLocals(localsWithDefaults),
    {
      h: { ...helpers, ...configHelpers },
    },
  )
}

export default context
