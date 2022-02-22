const resolve = attributes => {
  const ops = []
  if (attributes.to && !attributes.inject) {
    const add = require('./add').default
    ops.push(add)
  }
  if (attributes.to && attributes.inject) {
    const inject = require('./inject').default
    ops.push(inject)
  }
  if (attributes.echo) {
    const echo = require('./echo').default
    ops.push(echo)
  }
  if (attributes.sh) {
    const shell = require('./shell').default
    ops.push(shell)
  }
  return ops
}
export default resolve
