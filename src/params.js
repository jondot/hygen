// @flow

const L = require('lodash')
const path = require('path')
const yargs = require('yargs-parser')
const prompt = require('./prompt')

const params = async (templates: string, externalArgv: Array<any>): any => {
  const argv = yargs(externalArgv || process.argv.slice(2))

  const [generator, action] = argv._
  if (!generator || !action) {
    return { generator, action, templates }
  }
  const [mainAction, subaction] = L.split(action, ':')

  const actionfolder = path.join(templates, generator, mainAction)
  const promptArgs = await prompt(actionfolder)
  const args = Object.assign(
    {
      templates,
      actionfolder,
      generator,
      action,
      subaction
    },
    promptArgs,
    L.omit(argv, ['_'])
  )

  return args
}

module.exports = params
