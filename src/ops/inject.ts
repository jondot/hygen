import fs from 'fs-extra'
import path from 'path'
import { ActionResult, RenderedAction, RunnerConfig } from '../types'
import createResult from './result'
import injector from './injector'

const injectOp = async (
  action: RenderedAction,
  args: any,
  { logger, cwd }: RunnerConfig,
): Promise<ActionResult> => {
  const {
    attributes: { to, inject },
  } = action

  const result = createResult('inject', to)

  if (!(inject && to)) {
    return result('ignored')
  }

  const absTo = path.resolve(cwd, to)

  // @ts-ignore
  if (!(await fs.exists(absTo))) {
    logger.err(`Cannot inject to ${to}: doesn't exist.`)
    return result('error', {
      error: `Cannot inject to ${to}: doesn't exist.`,
    })
  }

  const content = (await fs.readFile(absTo)).toString()
  const injectResult = injector(action, content)

  if (!args.dry) {
    await fs.writeFile(absTo, injectResult)
  }
  logger.notice(`      inject: ${to}`)

  return result('inject')
}

export default injectOp
