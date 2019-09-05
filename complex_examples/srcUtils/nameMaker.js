const cc = require('change-case')
const inflection = require('inflection')

const suffixer = {
  get: function(target, prop, _receiver) {
    if (target.hasOwnProperty(prop)) return target[prop]

    if (prop[0] === prop[0].toLowerCase()) {
      return `${target.name}${cc.pascal(prop)}`
    } else if (prop === prop.toUpperCase()) {
      return `${target.NAME}_${prop}`
    } else {
      return `${target.Name}${cc.pascal(prop)}`
    }
  },
}

const nameMaker = ({ name, ...args }) => {
  const baseData = {
    name: inflection.singularize(cc.camel(name)),
    Name: inflection.singularize(cc.pascal(name)),
    names: inflection.pluralize(cc.camel(name)),
    Names: inflection.pluralize(cc.pascal(name)),
    NAME: cc.constant(inflection.singularize(cc.pascal(name))),
    NAMES: cc.constant(inflection.pluralize(cc.camel(name))),
  }
  Object.assign(args, baseData)
  return new Proxy(baseData, suffixer)
}

module.exports = { nameMaker }
