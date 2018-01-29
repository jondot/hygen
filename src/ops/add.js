import type { RenderedAction } from './types'
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const { red } = require('chalk')
const add = async (action: RenderedAction, args, { logger, cwd }) => {
  const { attributes: { to, inject } } = action
  if (!to || inject) {
    return
  }
  const absTo = path.join(cwd, to)

  if (await fs.exists(absTo)) {
    if (
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
