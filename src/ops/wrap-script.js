import type { ActionResult } from "../types";
import createResult from "./result";

const notEmpty = x => x && x.length > 0;
// TODO not at all sure I'm using the result right.
const wrapper = (name, script) => {
  return async (action, args, config): ActionResult => {
    const { attributes, body } = action;
    const { logger, exec } = config;

    const result = createResult(name, wrapped);
    if (notEmpty(name)) {
      const wrapped = script(action, args, config);
      if (!args.dry) {
        await exec(wrapped, body);
      }
      logger.ok(`       ${name}: ${wrapped}`);

      return result("executed");
    }
    return result("ignored");
  };
};
module.exports = wrapper;
