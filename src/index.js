// @flow
import type { RunnerConfig } from './types'

const engine = require('./engine')
const resolve = require('./config-resolver')
const { printHelp } = require('./help')
const runner = async (argv: Array<string>, config: RunnerConfig) => {
  const resolvedConfig = await resolve(config)
  const { templates, logger } = resolvedConfig
  try {
    await engine(argv, resolvedConfig)
  } catch (err) {
    logger.log(err.toString())
    if (config.debug) {
      logger.log('details -----------')
      logger.log(err.stack)
      logger.log('-------------------')
    }
    printHelp(templates, logger)
    // process.exit(1)
  }
}

module.exports = {
  runner,
  engine,
  resolve,
  printHelp
}
