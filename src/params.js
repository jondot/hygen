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

  const [generator, action, name] = argv._
  if (!generator || !action) {
    return { generator, action, templates }
  }
  const [mainAction, subaction] = L.split(action, ':')

  const actionfolder = path.join(templates, generator, mainAction)
  const cleanArgs = Object.assign(L.omit(argv, ['_']), name && { name })
  const promptArgs = await prompt(createPrompter, actionfolder, cleanArgs)
  const args = Object.assign(
    {
      templates,
      actionfolder,
      generator,
      action,
      subaction
    },
    promptArgs,
    cleanArgs
  )

  return args
}

module.exports = params
