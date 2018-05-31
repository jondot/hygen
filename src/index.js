// @flow
import type { RunnerResult, RunnerConfig } from './types'

const engine = require('./engine')
const resolve = require('./config-resolver')
const { printHelp, availableActions } = require('./help')
const runner = async (
  argv: Array<string>,
  config: RunnerConfig
): Promise<RunnerResult> => {
  const resolvedConfig = await resolve(config)
  const { templates, logger } = resolvedConfig
  try {
    const actions = await engine(argv, resolvedConfig)
    return { success: true, actions }
  } catch (err) {
    logger.log(err.toString())
    if (config.debug) {
      logger.log('details -----------')
      logger.log(err.stack)
      logger.log('-------------------')
    }
    printHelp(templates, logger)
    return { success: false, actions: [] }
    // process.exit(1)
  }
}

module.exports = {
  runner,
  engine,
  resolve,
  printHelp,
  availableActions
}
