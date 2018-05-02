// @flow

import type { RenderedAction, RunnerConfig } from '../types'
const fs = require('fs-extra')
const path = require('path')
const injector = require('./injector')

const inject = async (
  action: RenderedAction,
  args: any,
  { logger, cwd }: RunnerConfig
) => {
  const { attributes: { to, inject } } = action
  if (!(inject && to)) {
    return
  }
  const absTo = path.resolve(cwd, to)

  if (!await fs.exists(absTo)) {
    logger.err(`Cannot inject to ${to}: doesn't exist.`)
    return
  }

  const content = (await fs.readFile(absTo)).toString()
  const result = injector(action, content)

  if (!args.dry) {
    await fs.writeFile(absTo, result)
  }
  logger.notice(`      inject: ${to}`)
}

module.exports = inject
