// @flow

import type { ActionResult, RenderedAction, RunnerConfig } from '../types'
import createResult from './result'

const fs = require('fs-extra')
const path = require('path')
const injector = require('./injector')

const inject = async (
  action: RenderedAction,
  args: any,
  { logger, cwd }: RunnerConfig
): ActionResult => {
  const {
    attributes: { to, inject }
  } = action

  const result = createResult('inject', to)

  if (!(inject && to)) {
    return result('ignored')
  }

  const absTo = path.resolve(cwd, to)

  if (!(await fs.exists(absTo))) {
    logger.err(`Cannot inject to ${to}: doesn't exist.`)
    return result('error', {
      error: `Cannot inject to ${to}: doesn't exist.`
    })
  }

  const content = (await fs.readFile(absTo)).toString()
  const injectResult = injector(action, content)

  if (!args.dry) {
    await fs.writeFile(absTo, injectResult)
  }
  logger.notice(`      inject: ${to}`)

  return result('inject')
}

module.exports = inject
