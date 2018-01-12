// @flow

import type { Logger } from './types'

const fs = require('fs-extra')
const render = require('./render')
const params = require('./params')
const execute = require('./execute')

const engine = async (
  cwd: string,
  templates: string,
  logger: Logger,
  externalArgv: any = null
) => {
  const args = await params(templates, externalArgv)
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

  await execute(cwd, await render(args), args, { logger })
}

module.exports = engine
