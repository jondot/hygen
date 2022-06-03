import createDebug from 'debug'
import ora from 'ora'
import type { ActionResult } from '../types'
import createResult from './result'
const debug = createDebug('hygen:ops:shell')

const notEmpty = (x) => x && x.length > 0
const shell = async (
  { attributes: { sh, spinner, sh_ignore_exit }, body },
  args,
  { logger, exec },
): Promise<ActionResult> => {
  const result = createResult('shell', sh)
  if (notEmpty(sh)) {
    const spin = ora(`     shell: ${spinner === true ? 'running...' : spinner}`)
    if (!args.dry) {
      try {
        debug('exec %o %o', sh, body)
        spinner && spin.start()
        const res = await exec(sh, body)
        debug('result %o', res)
      } catch (error) {
        if (sh_ignore_exit !== true) {
          logger.err(error.stderr)
          process.exit(1)
        }
      } finally {
        spinner && spin.succeed()
      }
    }
    logger.ok(`       shell: ${sh}`)

    return result('executed')
  }
  return result('ignored')
}

export default shell
