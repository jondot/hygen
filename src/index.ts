import { RunnerResult, RunnerConfig } from './types'
import resolve from './config-resolver'

import engine from './engine'

import { printHelp, availableActions } from './help'

const runner = async (
  argv: string[],
  config: RunnerConfig,
): Promise<RunnerResult> => {
  const resolvedConfig = await resolve(config)
  const { templates, logger } = resolvedConfig
  try {
    const actions = await engine(argv, resolvedConfig)
    return { success: true, actions, time: 0 }
  } catch (err) {
    logger.log(err.toString())
    if (resolvedConfig.debug) {
      logger.log('details -----------')
      logger.log(err.stack)
      logger.log('-------------------')
    }
    printHelp(templates, logger)
    return { success: false, actions: [], time: 0 }
    // process.exit(1)
  }
}

export { runner, engine, resolve, printHelp, availableActions }
