import type { RunnerConfig } from './types'
import { capitalize, createHelpers, inflection } from './helpers'

const localsToCapitalize = ['name']
const localsToPluralize = ['name']
const localsDefaults = {
  name: 'unnamed',
}

const processLocals = (hsh, [key, value]) => {
  hsh[key] = value

  if (localsToCapitalize.includes(key)) {
    hsh[capitalize(key)] = capitalize(value)
  }

  if (localsToPluralize.includes(key)) {
    hsh[inflection.pluralize(key)] = inflection.pluralize(value)
    hsh[capitalize(inflection.pluralize(key))] = capitalize(
      inflection.pluralize(value),
    )
  }

  return hsh
}

const processedLocals = (locals: any) =>
  Object.entries(locals).reduce(processLocals, {})

const context = (locals: any, config: RunnerConfig = {}) => {
  const localsWithDefaults = {
    ...localsDefaults,
    ...config.localsDefaults,
    ...locals,
  }

  return Object.assign(
    localsWithDefaults,
    processedLocals(localsWithDefaults),
    {
      h: createHelpers(locals, config),
    },
  )
}

export default context
