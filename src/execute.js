// @flow

import type { RunnerConfig, RenderedAction } from './types'
const resolve = require('./ops')

const execute = async (
  renderedActions: Array<RenderedAction>,
  args: any,
  config: RunnerConfig
) => {
  const { logger } = config
  const messages = []
  for (const action of renderedActions) {
    const { message } = action.attributes
    if (message) {
      messages.push(message)
    }
    const ops = resolve(action.attributes)
    for (const op of ops) {
      await op(action, args, config)
    }
  }
  if (messages.length > 0) {
    logger.colorful(`${args.action}:\n${messages.join('\n')}`)
  }
}
module.exports = execute
