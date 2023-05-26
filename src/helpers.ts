import path from 'path'
import inflection from 'inflection'
import changeCase from 'change-case'
import type { RunnerConfig } from './types'

// supports kebab-case to KebabCase
inflection.undasherize = (str) =>
  str
    .split(/[-_]/)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('')

const capitalize = (str) => {
  const toBeCapitalized = String(str)
  return toBeCapitalized.charAt(0).toUpperCase() + toBeCapitalized.slice(1)
}

const globalHelpers = {
  capitalize,
  inflection,
  changeCase,
  path,
}

const createHelpers = (locals: any, config: RunnerConfig): any => {
  const configHelpers =
    (config &&
      (typeof config.helpers === 'function'
        ? config.helpers(locals, config)
        : config.helpers)) ||
    {}
  return { ...globalHelpers, ...configHelpers }
}

export { capitalize, createHelpers, inflection }
