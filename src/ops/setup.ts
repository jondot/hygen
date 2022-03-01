import path from 'path'
import createDebug from 'debug'
import degit from 'degit'
import type { ActionResult } from '../types'
import createResult from './result'
const debug = createDebug('hygen:ops:setup')
/*
XXX:
- Name -> target directory
- setup -> rename to 'from'?
-  --setup|from argument overrides setup
-  --mode argument
-  --verbose, --cache
XXX: 
- testing infra: when focus added ignore snapshots
- better ignoring when focusing?
- better separation to individual tests?, rework test generation

*/

const notEmpty = (x) => x && x.length > 0
const setup = async (
  { attributes: { setup, mode, verbose, force } },
  args,
  { logger, cwd },
): Promise<ActionResult> => {
  const result = createResult('setup', setup)
  if (notEmpty(setup)) {
    if (!setup.includes('/')) {
      throw new Error(`'${setup}' must be a repo`)
    }
    const to = args.to || '.'
    const payload = {
      setup,
      mode: mode || 'tar',
      verbose: !!verbose,
      force: !!args.force || !!force,
      to: path.resolve(cwd, to),
    }
    if (!args.dry) {
      try {
        debug('exec %o %o', setup, payload)
        const d = degit(setup, {
          mode: payload.mode,
          force: payload.force,
          verbose: payload.verbose,
        })
        await d.clone(payload.to)
        debug('done')
        logger.ok(`       setup: ${setup} -> ${to}`)
      } catch (error) {
        debug('error %o', error)
        logger.err(`       setup: ${setup} ${error}`)
      }
    } else {
      logger.ok(`       setup: ${setup} -> ${to}`)
    }

    return result('executed', payload)
  }
  return result('ignored')
}

export default setup
