// @flow

import type { RunnerConfig } from 'src/v4/types'

const path = require('path')
const yargs = require('yargs-parser')
const prompt = require('src/v4/prompt')

const params = async (
  { templates, createPrompter }: RunnerConfig,
  externalArgv: Array<string>,
): any => {
  const argv = yargs(externalArgv)

  const [generator, action, name] = argv._
  if (!generator || !action) {
    return { generator, action, templates }
  }
  const [mainAction, subaction] = action.split(':')

  const actionfolder = path.join(templates, generator, mainAction)
  const { _, ...cleanArgv } = argv
  const promptArgs = await prompt(createPrompter, actionfolder, cleanArgv)

  const args = Object.assign(
    {
      templates,
      actionfolder,
      generator,
      action,
      subaction,
    },
    promptArgs,
    cleanArgv,
    name && { name },
  )

  return args
}

module.exports = params
