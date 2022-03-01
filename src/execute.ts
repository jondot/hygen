import createDebug from 'debug'
import resolve from './ops'
import type { ActionResult, RenderedAction, RunnerConfig } from './types'
const debug = createDebug('hygen:execute')

const execute = async (
  renderedActions: RenderedAction[],
  args: any,
  config: RunnerConfig,
): Promise<ActionResult[]> => {
  const { logger } = config
  const messages = []
  const results = []
  for (const action of renderedActions) {
    const { message } = action.attributes
    if (message) {
      messages.push(message)
    }
    const ops = await resolve(action.attributes)
    debug('executing %o ops', ops.length)
    for (const op of ops) {
      debug('executing: %o', op)
      results.push(await op(action, args, config))
    }
    debug('executing ops: done')
  }
  if (messages.length > 0) {
    logger.colorful(`${args.action}:\n${messages.join('\n')}`)
  }

  return results
}

export default execute
