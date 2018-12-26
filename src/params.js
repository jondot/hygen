// @flow

import type { RunnerConfig } from './types'

const L = require('lodash')
const path = require('path')
const yargs = require('yargs-parser')
const prompt = require('./prompt')

const params = async (
  { templates, createPrompter }: RunnerConfig,
  externalArgv: Array<string>
): any => {
  const argv = yargs(externalArgv)

  const [generator, action] = argv._
  if (!generator || !action) {
    return { generator, action, templates }
  }
  const [mainAction, subaction] = L.split(action, ':')

  const actionfolder = path.join(templates, generator, mainAction)
  const promptArgs = await prompt(
    createPrompter,
    actionfolder,
    L.omit(argv, ['_'])
  )
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
