// @flow

import type { RenderedAction } from './types'

const { yellow, red, green, magenta } = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const L = require('lodash')
const inject = require('./inject')

const execute = (
  cwd: string,
  renderedActions: Array<RenderedAction>,
  prompt: string => string,
  args: any,
  opts: any = {}
) => {
  const { logger } = opts
  const messages = []
  for (const action of renderedActions) {
    const relativeTo = action.attributes.to
    const injectAction = action.attributes.inject
    const to = path.join(cwd, relativeTo)

    if (!to) {
      logger.error(
        yellow(
          `WARN: skipping ${relativeTo}, no 'to' field provided in template.`
        )
      )
      continue
    }

    const { message } = action.attributes
    if (message) {
      messages.push(message)
    }
    if (injectAction) {
      if (!fs.existsSync(to)) {
        logger.error(red(`Cannot inject to ${to}: doesn't exist.`))
        continue
      }

      if (!args.dry) {
        fs.writeFileSync(
          to,
          inject(action, fs.readFileSync(to).toString()).body
        )
      }
      logger.log(magenta(`      inject: ${relativeTo}`))
    } else {
      if (fs.existsSync(to)) {
        // readline-sync doesn't accept ^C, we'll need to replace it.
        if (
          (
            prompt(red(`      exists: ${relativeTo}. Overwrite? (y/N): `)) ||
            'n'
          ).toLowerCase() !== 'y'
        ) {
          logger.log(yellow(`     skipped: ${relativeTo}`))
          continue
        }
      }

      if (!args.dry) {
        fs.ensureDirSync(path.dirname(to))
        fs.writeFileSync(to, action.body)
      }
      logger.log(green(`       added: ${relativeTo}`))
    }
  }
  if (messages.length > 0) {
    logger.log(L.map(messages, m => `* ${m}`).join('\n'))
  }
}
module.exports = execute
