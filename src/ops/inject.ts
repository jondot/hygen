import path from 'path'
import fs from 'fs-extra'
import type { ActionResult, RenderedAction, RunnerConfig } from '../types'
import createResult from './result'
import injector from './injector'

const injectOp = async (
  action: RenderedAction,
  args: any,
  { logger, cwd }: RunnerConfig,
): Promise<ActionResult> => {
  logger.log('inject')

  const {
    attributes: { to, inject },
  } = action

  const result = createResult('inject', to)

  if (!(inject && to)) {
    return result('ignored')
  }

  const absTo = path.resolve(cwd, to)

  if (!(await fs.exists(absTo))) {
    logger.warn(`${to} doesn't exist, now creating file`)
    fs.ensureFileSync(absTo)
    logger.ok(`${to} was successfuly created`)
  }

  const content = (await fs.readFile(absTo)).toString()
  const injectResult = injector(action, content)

  if (!args.dry) {
    await fs.writeFile(absTo, injectResult)
  }
  const pathToLog = process.env.HYGEN_OUTPUT_ABS_PATH ? absTo : to
  logger.notice(`      inject: ${pathToLog}`)

  return result('inject')
}

export default injectOp
