const L = require('lodash')
const path = require('path')
const yargs = require('yargs-parser')

const params = (templates, externalArgv) => {
  const argv = yargs(externalArgv || process.argv.slice(2))

  const [generator, action] = argv._
  if (!generator || !action) {
    return { generator, action, templates }
  }

  const actionfolder = path.join(templates, generator, action)
  const args = Object.assign(
    {
      templates,
      actionfolder,
      generator,
      action
    },
    L.omit(argv, ['_'])
  )

  return args
}

module.exports = params
