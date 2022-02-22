import path from 'path'
import yargs from 'yargs-parser'
import { RunnerConfig, ParamsResult } from './types'
import prompt from './prompt'

const params = async (
  { templates, createPrompter }: RunnerConfig,
  externalArgv: string[],
): Promise<ParamsResult> => {
  const argv = yargs(externalArgv)

  const [generator, action, name] = argv._
  if (!generator || !action) {
    return { generator, action, templates }
  }
  const [mainAction, subaction] = action.split(':')

  const actionfolder = path.join(templates, generator, mainAction)

  const { _, ...cleanArgv } = argv
  const promptArgs: any = await prompt(createPrompter, actionfolder, {
    // NOTE we might also want the rest of the generator/action/etc. params here
    // but theres no usecase yet
    ...(name ? { name } : {}),
    ...cleanArgv,
  })

  const args = {
    templates,
    actionfolder,
    generator,
    action,
    subaction,
    ...cleanArgv,
    ...(name ? { name } : {}),
    ...promptArgs,
  }

  return args
}

export default params
