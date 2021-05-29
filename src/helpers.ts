import inflection from 'inflection'
import changeCase from 'change-case'
import path from 'path'

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

export default helpers
