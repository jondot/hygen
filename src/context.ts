import inflection from 'inflection'
import changeCase from 'change-case'
import path from 'path'
import { RunnerConfig } from './types'

const localsToCapitalize = ['name']
const localsDefaults = {
  name: 'unnamed',
}
// supports kebab-case to KebabCase
inflection.undasherize = (str) =>
  str
    .split(/[-_]/)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('')

const helpers = {
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  inflection,
  changeCase,
  path,
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
