// @flow

const L = require('lodash')
const path = require('path')
const yargs = require('yargs-parser')

const params = (templates: string, externalArgv: Array<any>): any => {
  const argv = yargs(externalArgv || process.argv.slice(2))

  const [generator, action] = argv._
  if (!generator || !action) {
    return { generator, action, templates }
  }
  const [mainAction, subaction] = L.split(action, ':')

  const actionfolder = path.join(templates, generator, mainAction)
  const args = Object.assign(
    {
      templates,
      actionfolder,
      generator,
      action,
      subaction
    },
    L.omit(argv, ['_'])
  )

  return args
}

module.exports = params
