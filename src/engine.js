// @flow

import type { RunnerConfig } from './types'

const fs = require('fs-extra')
const params = require('./params')

const engine = async (argv: Array<string>, config: RunnerConfig) => {
  const { cwd, templates, logger } = config
  const args = Object.assign(await params(templates, argv), { cwd })
  const { generator, action, actionfolder } = args

  logger.log(args.dry ? '(dry mode)' : '')
  if (!generator) {
    throw new Error('please specify a generator.')
  }

  if (!action) {
    throw new Error(`please specify an action for ${generator}.`)
  }

  logger.log(`Loaded templates: ${templates.replace(cwd + '/', '')}`)
  if (!await fs.exists(actionfolder)) {
    throw new Error(
      `cannot find action '${action}' for generator '${generator}' (looked for ${generator}/${action} in ${templates}).`
    )
  }

  // lazy loading these dependencies gives a better feel once
  // a user is exploring hygen (not specifying what to execute)
  const execute = require('./execute')
  const render = require('./render')
  await execute(await render(args), args, config)
}

module.exports = engine
