const resolve = async (attributes) => {
  const ops = []
  if (attributes.to && !attributes.inject) {
    const add = (await import('./add')).default
    ops.push(add)
  }
  if (attributes.to && attributes.inject) {
    const inject = (await import('./inject')).default
    ops.push(inject)
  }
  if (attributes.echo) {
    const echo = require('./echo').default
    ops.push(echo)
  }
  if (attributes.sh) {
    const shell = (await import('./shell')).default
    ops.push(shell)
  }
  return ops
}
export default resolve
