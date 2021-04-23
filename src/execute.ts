import resolve from './ops'
import { RunnerConfig, RenderedAction, ActionResult } from './types'

const execute = async (
  renderedActions: RenderedAction[],
  args: any,
  config: RunnerConfig,
) => {
  const { logger } = config
  const results = []
  if (renderedActions.some((a) => a.attributes.message)) {
    logger.colorful(`${args.action}:\n`)
  }
  for (const action of renderedActions) {
    const { message } = action.attributes

    const ops = resolve(action.attributes)
    for (const op of ops) {
      results.push(await op(action, args, config))
    }

    if (message) {
      logger.colorful(`${message}\n`)
    }
  }

  return results as ActionResult[]
}

export default execute
