import path from 'path'
import inflection from 'inflection'
import changeCase from 'change-case'

// supports kebab-case to KebabCase
inflection.undasherize = (str) =>
  str
    .split(/[-_]/)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('')

const helpers = {
  capitalize(str) {
    const toBeCapitalized = String(str)
    return toBeCapitalized.charAt(0).toUpperCase() + toBeCapitalized.slice(1)
  },
  inflection,
  changeCase,
  path,
}

export default helpers
