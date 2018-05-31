// @flow

import type { Logger } from './types'

const fs = require('fs')
const L = require('lodash')
const path = require('path')
const chalk = require('chalk')
const availableActions = (templates: string) => {
  const generators = L.filter(fs.readdirSync(templates), _ =>
    fs.lstatSync(path.join(templates, _)).isDirectory()
  )
  return L.reduce(
    generators,
    (acc, generator) => {
      const actions = fs.readdirSync(path.join(templates, generator))
      acc[generator] = actions
      return acc
    },
    {}
  )
}

const printHelp = (templates: string, logger: Logger) => {
  logger.log('\nAvailable actions:')
  if (!templates) {
    logger.log(
      `No generators or actions found. 

      This means I didn't find a _templates folder right here, 
      or anywhere up the folder tree starting here.

      Here's how to start using Hygen:

      $ hygen init self
      $ hygen with-prompt new --name my-generator

      (edit your generator in _templates/my-generator)

      $ hygen my-generator 

      See http://hygen.io for more.
      
      `
    )
    return
  }
  L.each(availableActions(templates), (v, k) => {
    logger.log(chalk.bold(k) + ': ' + v.join(', '))
  })
}

module.exports = { availableActions, printHelp }
