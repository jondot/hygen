import type { ActionResult } from '../types'
import createResult from './result'

const wrapper = (name, plugin) => {
  const result = createResult(`plugin:${name}`, plugin)
  return async (action, args, config): ActionResult => {
    const { attributes } = action
    const { logger } = config
    const attribute = attributes[name]

    if (!args.dry) {
      // eslint-disable-next-line no-param-reassign
      args[name] = await plugin(attribute, action, args, config)
      // console.log(args)
      logger.ok(`       ${name}: ${args[name]}`)
      return result('executed', args[name])
    } else {
      return result('ignored')
    }
  }
}
module.exports = wrapper
