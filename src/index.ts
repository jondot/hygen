import type { RunnerConfig, RunnerResult } from './types'
import resolve from './config-resolver'
import Logger from './logger'
import engine, { ShowHelpError } from './engine'

import { VERSION, availableActions, printHelp } from './help'

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
    if (err instanceof ShowHelpError) {
      printHelp(templates, logger)
    }
    return { success: false, actions: [], time: 0 }
  }
}

export { runner, engine, resolve, printHelp, availableActions, Logger, VERSION }
