// @flow

import type { RunnerConfig, RenderedAction, ActionResult } from 'src/v4/types'
const resolve = require('src/ops')

const execute = async (
  renderedActions: Array<RenderedAction>,
  args: any,
  config: RunnerConfig
): Promise<Array<ActionResult>> => {
  const { logger } = config
  const messages = []
  const results = []
  for (const action of renderedActions) {
    const { message } = action.attributes
    if (message) {
      messages.push(message)
    }
    const ops = resolve(action.attributes)
    for (const op of ops) {
      results.push(await op(action, args, config))
    }
  }
  if (messages.length > 0) {
    logger.colorful(`${args.action}:\n${messages.join('\n')}`)
  }

  return results
}
module.exports = execute
