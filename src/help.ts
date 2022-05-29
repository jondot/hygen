import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import type { Logger } from './types'
import { DEFAULT_ACTION } from './params'
const pkg = require('../package.json') // eslint-disable-line @typescript-eslint/no-var-requires

const VERSION = pkg.version

const availableActions = (templates: string) => {
  const generators = fs
    .readdirSync(templates)
    .filter((_) => fs.lstatSync(path.join(templates, _)).isDirectory())
  return generators.reduce((acc, generator) => {
    const actions = fs.readdirSync(path.join(templates, generator))
    acc[generator] = actions
    return acc
  }, {})
}

const printHelp = (templates: string, logger: Logger) => {
  logger.log(`Hygen v${VERSION}`)
  logger.log('\nAvailable actions:')
  if (!templates) {
    logger.log(`No generators or actions found. 

      This means I didn't find a _templates folder right here, 
      or anywhere up the folder tree starting here.

      Here's how to start using Hygen:

      $ hygen init self
      $ hygen with-prompt new --name my-generator

      (edit your generator in _templates/my-generator)

      $ hygen my-generator 

      See http://hygen.io for more.
      
      `)
    return
  }
  Object.entries(availableActions(templates)).forEach(([k, v]: [any, any]) => {
    logger.log(
      `${chalk.bold(k)}: ${
        v.find((a) => a === DEFAULT_ACTION)
          ? `${k}${v.length > 1 ? ',' : ''} `
          : ''
      }${v
        .filter((a) => a !== DEFAULT_ACTION)
        .map((a) => `${k} ${a}`)
        .join(', ')}`,
    )
  })
}

export { availableActions, printHelp, VERSION }
