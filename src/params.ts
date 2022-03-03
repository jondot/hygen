import path from 'path'
import yargs from 'yargs-parser'
import type { ParamsResult, RunnerConfig } from './types'

import prompt from './prompt'

const params = async (
  { templates, createPrompter }: RunnerConfig,
  externalArgv: string[],
): Promise<ParamsResult> => {
  const argv = yargs(externalArgv)

  const [generator, action, name] = argv._

  // yargs can throw numbers or strings, for this case we want strings
  if (
    typeof generator !== 'string' ||
    typeof action !== 'string' ||
    typeof name !== 'string'
  ) {
    return
  }

  if (!generator || !action) {
    return { generator, action, templates }
  }
  const [mainAction, subaction] = action.split(':')

  const actionfolder = path.join(templates, generator, mainAction)

  const { _, ...cleanArgv } = argv
  const promptArgs = await prompt(createPrompter, actionfolder, {
    // NOTE we might also want the rest of the generator/action/etc. params here
    // but theres no usecase yet
    ...(name ? { name } : {}),
    ...cleanArgv,
  })

  const args = Object.assign(
    {
      templates,
      actionfolder,
      generator,
      action,
      subaction,
    },
    cleanArgv,
    name && { name },
    promptArgs,
  )

  return args
}

export default params
