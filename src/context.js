// @flow

const L = require('lodash')
const inflection = require('inflection')

// supports kebab-case to KebabCase
inflection.undasherize = str =>
  str
    .split(/[-_]/)
    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('')

const helpers = {
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  },
  inflection
}

const localsToCapitalize = ['name']
const localsDefaults = {
  name: 'unnamed'
}
const capitalizedLocals = (locals: any) =>
  L.mapValues(
    L.mapKeys(L.pick(locals, localsToCapitalize), (v, k) =>
      helpers.capitalize(k)
    ),
    v => helpers.capitalize(v)
  )

const context = (locals: any) => {
  const localsWithDefaults = Object.assign({}, localsDefaults, locals)
  return Object.assign(
    localsWithDefaults,
    capitalizedLocals(localsWithDefaults),
    {
      h: helpers
    }
  )
}
module.exports = context
