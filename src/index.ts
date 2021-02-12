import { RunnerResult, RunnerConfig } from './types'
import resolve from './config-resolver'

import engine, { ShowHelpError } from './engine'

import { printHelp, availableActions, VERSION } from './help'

const runner = async (
  argv: string[],
  config: RunnerConfig,
): Promise<RunnerResult> => {
  const resolvedConfig = await resolve(config)
  const { templates, logger } = resolvedConfig
  try {
    const actions = await engine(argv, resolvedConfig)
    return { success: true, actions, time: 0 }
  } catch (error) {
    logger.log(error.toString())
    if (resolvedConfig.debug) {
      logger.log('details -----------')
      logger.log(error.stack)
      logger.log('-------------------')
    }
    if (error instanceof ShowHelpError) {
      printHelp(templates, logger)
    }
    return { success: false, actions: [], time: 0 }
  }
}

export { runner, engine, resolve, printHelp, availableActions, VERSION }
