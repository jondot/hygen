import { ActionResult, RunnerConfig, RenderedAction } from '../types'
import createResult from './result'

const path = require('path')
const fs = require('fs-extra')
const { red } = require('chalk')

const askForOverwrite = async (prompter, to) => {
  const { overwrite } = await prompter.prompt({
    prefix: '',
    type: 'confirm',
    name: 'overwrite',
    message: red(`     exists: ${to}. Overwrite? (y/N): `),
  })

  return overwrite
}

const getShouldSkip = async (absTo, attributes, createPrompter) => {
  const { to, unless_exists, force } = attributes

  const fileExists = await fs.exists(absTo)
  const shouldNotOverwrite =
    !force && unless_exists !== undefined && unless_exists === true

  if (shouldNotOverwrite && fileExists) {
    return true
  }

  const prompter = createPrompter()

  if (
    !process.env.HYGEN_OVERWRITE &&
    fileExists &&
    !(await askForOverwrite(prompter, to))
  ) {
    return true
  }

  return false
}

const add = async (
  action: RenderedAction,
  args: any,
  { logger, cwd, createPrompter }: RunnerConfig,
): Promise<ActionResult> => {
  const {
    attributes: { to, inject, force, from },
  } = action
  const result = createResult('add', to)

  if (!to || inject) {
    return result('ignored')
  }
  const absTo = path.resolve(cwd, to)
  const shouldSkip = await getShouldSkip(
    absTo,
    action.attributes,
    createPrompter,
  )

  if (shouldSkip) {
    logger.warn(`     skipped: ${to}`)
    return result('skipped')
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

  const pathToLog = process.env.HYGEN_OUTPUT_ABS_PATH ? absTo : to
  logger.ok(`       ${force ? 'FORCED' : 'added'}: ${pathToLog}`)

  return result('added')
}

export default add
