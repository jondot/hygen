// @flow

import type { RunnerConfig, RenderedAction } from './types'
const { yellow, red, green, magenta } = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const L = require('lodash')
const inject = require('./inject')
const inquirer = require('inquirer')
const execa = require('execa')

const execute = async (
  renderedActions: Array<RenderedAction>,
  args: any,
  config: RunnerConfig
) => {
  const { logger, cwd } = config
  const messages = []
  for (const action of renderedActions) {
    const relativeTo = action.attributes.to
    if (relativeTo) {
      const injectAction = action.attributes.inject
      const to = path.join(cwd, relativeTo)
      const { message } = action.attributes
      if (message) {
        messages.push(message)
      }
      if (injectAction) {
        if (!await fs.exists(to)) {
          logger.error(red(`Cannot inject to ${to}: doesn't exist.`))
          continue
        }

        if (!args.dry) {
          await fs.writeFile(
            to,
            inject(action, (await fs.readFile(to)).toString()).body
          )
        }
        logger.log(magenta(`      inject: ${relativeTo}`))
      } else {
        if (await fs.exists(to)) {
          // readline-sync doesn't accept ^C, we'll need to replace it.
          if (
            !await inquirer
              .prompt({
                prefix: '',
                type: 'confirm',
                name: 'overwrite',
                message: red(`     exists: ${relativeTo}. Overwrite? (y/N): `)
              })
              .then(({ overwrite }) => overwrite)
          ) {
            logger.log(yellow(`     skipped: ${relativeTo}`))
            continue
          }
        }

        if (!args.dry) {
          await fs.ensureDir(path.dirname(to))
          await fs.writeFile(to, action.body)
        }
        logger.log(green(`       added: ${relativeTo}`))
      }
    }

    const sh = action.attributes.sh
    if (sh && sh.length > 0) {
      const opts =
        action.body && action.body.length > 0 ? { input: action.body } : {}
      if (!args.dry) {
        await execa.shell(sh, opts)
      }
      logger.log(green(`       shell: ${sh}`))
    }
  }
  if (messages.length > 0) {
    logger.log(L.map(messages, m => `* ${m}`).join('\n'))
  }
}
module.exports = execute
