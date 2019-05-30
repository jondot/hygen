import context from '../context'
import plugin from './plugin'

const resolve = (attributes, args, config) => {
  const ops = []
  if (config.plugins) {
    Object.entries.forEach(([key, func]) => {
      if (attributes[key]) ops.push(plugin(key, func))
    })
  }
  if (attributes.to && !attributes.inject) {
    const add = require('./add')
    ops.push(add)
  }
  if (attributes.to && attributes.inject) {
    const inject = require('./inject')
    ops.push(inject)
  }
  if (attributes.sh) {
    const shell = require('./shell')
    ops.push(shell)
  }
  return ops
}
module.exports = resolve
