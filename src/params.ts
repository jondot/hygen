import path from 'path'
import yargs from 'yargs-parser'
import fs from 'fs-extra'
import type { ParamsResult, RunnerConfig } from './types'

import prompt from './prompt'
export const DEFAULT_ACTION = '_default'

const resolvePositionals = async (templates: string, args: string[]) => {
  /*
  we want a to create flexible resolution and allow both:

  1. [gen] [action] [NAME]
  2. [gen] [NAME] which, if NAME=action, has a conflict, so goes to the generator with
      an empty name, otherwise -- goes to the new '_default' generator, with a name of 'NAME'

  E.g.
  for a template layout of:
  init/
    repo/
    ..

  init repo (repo exists, so goes to the repo gen, this is not a default named 'repo'!)
  init repo MyName
  init MyName (default, name=MyName), default because 'repo' does not exist
  init (default, name=[empty]), default always!
  */
  let [generator, action, name] = args
  if (
    generator &&
    action &&
    (await fs.exists(path.join(templates, generator, action)))
  ) {
    return [generator, action, name]
  }

  if (
    generator &&
    (await fs.exists(path.join(templates, generator, DEFAULT_ACTION)))
  ) {
    action = DEFAULT_ACTION
    ;[generator, name] = args
  }
  return [generator, action, name]
}

const params = async (
  { templates, createPrompter }: RunnerConfig,
  externalArgv: string[],
): Promise<ParamsResult> => {
  const argv = yargs(externalArgv)

  const [generator, action, name] = await resolvePositionals(templates, argv._)

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
    // include positionals as special arg for templates to consume,
    // and a unique timestamp for this run
    { _, ts: process.env.HYGEN_TS || new Date().getTime() },
    cleanArgv,
    name && { name },
    promptArgs,
  )

  return args
}

export default params
