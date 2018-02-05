// @flow

import type { RunnerConfig, RenderedAction } from './types'
const L = require('lodash')
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
    logger.log(L.map(messages, m => `* ${m}`).join('\n'))
  }
}
module.exports = execute
