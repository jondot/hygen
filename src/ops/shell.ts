import createDebug from 'debug'
import type { ActionResult } from '../types'
import createResult from './result'
const debug = createDebug('hygen:ops:shell')

const notEmpty = (x) => x && x.length > 0
const shell = async (
  { attributes: { sh }, body },
  args,
  { logger, exec },
): Promise<ActionResult> => {
  const result = createResult('shell', sh)
  if (notEmpty(sh)) {
    if (!args.dry) {
      try {
        debug('exec %o %o', sh, body)
        const res = await exec(sh, body)
        debug('result %o', res)
      } catch (error) {
        logger.err(error.stderr)
        process.exit(1)
      }
    }
    logger.ok(`       shell: ${sh}`)

    return result('executed')
  }
  return result('ignored')
}

export default shell
