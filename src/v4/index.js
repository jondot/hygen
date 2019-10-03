// @flow
import type { RunnerResult, RunnerConfig } from 'src/v4/types'

const engine = require('src/v4/engine')
const resolve = require('src/v4/config-resolver')
const { printHelp, availableActions } = require('src/v4/help')
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
