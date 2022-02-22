import { RunnerConfig } from './types'
import helpers from './helpers'

const localsToCapitalize = ['name']
const localsDefaults = {
  name: 'unnamed',
}

const doCapitalization = (hsh, [key, value]) => {
  const newHsh = { ...hsh }

  newHsh[key] = value

  if (localsToCapitalize.includes(key))
    newHsh[helpers.capitalize(key)] = helpers.capitalize(value)

  return newHsh
}

const capitalizedLocals = (locals: any) =>
  Object.entries(locals).reduce(doCapitalization, {})

const context = (locals: any, config: RunnerConfig = {}) => {
  const localsWithDefaults = {
    ...localsDefaults,
    ...config.localsDefaults,
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
    capitalizedLocals(localsWithDefaults),
    {
      h: { ...helpers, ...configHelpers },
    },
  )
}

export default context
