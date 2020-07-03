import { ActionResult, RunnerConfig, RenderedAction } from '../types'
import createResult from './result'

const path = require('path')
const fs = require('fs-extra')
const { red } = require('chalk')

const add = async (
  action: RenderedAction,
  args: any,
  { logger, cwd, createPrompter }: RunnerConfig,
): Promise<ActionResult> => {
  const {
    attributes: { to, inject, unless_exists, force, from },
  } = action
  const result = createResult('add', to)
  const prompter = createPrompter()
  if (!to || inject) {
    return result('ignored')
  }
  const absTo = path.resolve(cwd, to)
  const shouldNotOverwrite = !force &&
    unless_exists !== undefined && unless_exists === true

  if (!process.env.HYGEN_OVERWRITE && !force && (await fs.exists(absTo))) {
    if (
      shouldNotOverwrite ||
      !(await prompter
        .prompt({
          prefix: '',
          type: 'confirm',
          name: 'overwrite',
          message: red(`     exists: ${to}. Overwrite? (y/N): `),
        })
        .then(({ overwrite }) => overwrite))
    ) {
      logger.warn(`     skipped: ${to}`)
      return result('skipped')
    }
  }

  if (from) {
    const from_path = path.join(args.templates, from)
    const file = fs.readFileSync(from_path).toString()
    action.body = file
  }

  if (!args.dry) {
    await fs.ensureDir(path.dirname(absTo))
    await fs.writeFile(absTo, action.body)
  }
  logger.ok(`       ${force ? 'FORCED' : 'added'}: ${to}`)
  return result('added')
}

export default add
