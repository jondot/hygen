// @flow

import type { RunnerConfig } from './types'

const L = require('lodash')
const path = require('path')
const yargs = require('yargs-parser')
const prompt = require('./prompt')
const { availableActions } = require('./help')

const params = async (
  { templates, logger, createPrompter }: RunnerConfig,
  externalArgv: Array<string>
): any => {
  const argv = yargs(externalArgv)
  let [generator, action] = argv._
  const name = argv._[2]

  if (argv.prompt) {
    logger.log('Asking for generator and action')

    const availableOptions = availableActions(templates)

    const prompter = createPrompter()
    let response = await prompter.prompt({
      type: 'select',
      name: 'generator',
      message: 'Generator?',
      choices: Object.keys(availableOptions)
    })
    generator = response.generator // eslint-disable-line prefer-destructuring

    response = await prompter.prompt({
      type: 'select',
      name: 'action',
      message: 'Action?',
      choices: availableOptions[generator]
    })
    action = response.action // eslint-disable-line prefer-destructuring
  }

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
