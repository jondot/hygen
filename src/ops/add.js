// @flow

import type { RunnerConfig, RenderedAction } from '../types'
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const { red } = require('chalk')
const add = async (
  action: RenderedAction,
  args: any,
  { logger, cwd }: RunnerConfig
) => {
  const { attributes: { to, inject, unless_exists } } = action
  if (!to || inject) {
    return
  }
  const absTo = path.resolve(cwd, to)
  const shouldNotOverwrite =
    unless_exists !== undefined && unless_exists === true

  if (await fs.exists(absTo)) {
    if (
      shouldNotOverwrite ||
      !await inquirer
        .prompt({
          prefix: '',
          type: 'confirm',
          name: 'overwrite',
          message: red(`     exists: ${to}. Overwrite? (y/N): `)
        })
        .then(({ overwrite }) => overwrite)
    ) {
      logger.warn(`     skipped: ${to}`)
      return
    }
  }

  if (!args.dry) {
    await fs.ensureDir(path.dirname(absTo))
    await fs.writeFile(absTo, action.body)
  }
  logger.ok(`       added: ${to}`)
}

module.exports = add
