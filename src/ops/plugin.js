import type { ActionResult } from "../types";
import createResult from "./result"

const notEmpty = x => x && x.length > 0
// TODO not at all sure I'm using the result right.
const wrapper = (name, plugin) => {
  const result = createResult(`plugin:${name}`, plugin)
  return async (action, args, config): ActionResult => {
    const {attributes, body} = action
    const {logger, exec} = config

    if (!args.dry) {
      /*
       BIG BIG NAUGHTY NO NO
        args[name] already defined?
        silently changing the args as a side effect
      */
      args[name] = await plugin(action, args, config)

      logger.ok(`       ${name}: ${args[name]}`)
      return result('executed', args[name])
    } else {
      return result('ignored')
    }
  }
};
module.exports = wrapper
