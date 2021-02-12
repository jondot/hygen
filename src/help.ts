import fs from 'fs'

import path from 'path'
import chalk from 'chalk'
import { Logger } from './types'
import { getNoGeneratorsFoundMessage } from './errors'

const VERSION = '6.0.3'

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
    logger.log(getNoGeneratorsFoundMessage())
    return
  }
  Object.entries(availableActions(templates)).forEach(([k, v]) => {
    logger.log(`${chalk.bold(k)}: ${(v as any).join(', ')}`)
  })
}

export { availableActions, printHelp, VERSION }
