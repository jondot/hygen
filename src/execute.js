// @flow

import type { RenderedAction } from './types'

const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')

const execute = (
  cwd: string,
  renderedActions: Array<RenderedAction>,
  prompt: string => string,
  args: any,
  opts: any = {}
) => {
  for (const action of renderedActions) {
    const relativeTo = action.attributes.to
    const to = path.join(cwd, relativeTo)
    const { logger } = opts

    if (!to) {
      logger.error(
        chalk.yellow(
          `WARN: skipping ${relativeTo}, no 'to' field provided in template.`
        )
      )
    }
    if (fs.existsSync(to)) {
      // readline-sync doesn't accept ^C, we'll need to replace it.
      if (
        (prompt(chalk.red(`      exists: ${relativeTo}. Overwrite? (y/N): `)) ||
          'n'
        ).toLowerCase() !== 'y'
      ) {
        logger.log(chalk.yellow(`     skipped: ${relativeTo}`))
        continue
      }
    }
    if (!args.dry) {
      fs.ensureDirSync(path.dirname(to))
      fs.writeFileSync(to, action.body)
    }
    logger.log(chalk.green(`       added: ${relativeTo}`))
  }
}
module.exports = execute
