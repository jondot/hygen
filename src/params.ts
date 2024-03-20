import { join as joinPath } from 'path'
import yargs from 'yargs-parser'
import fs from 'fs-extra'
import type { ActionsMap, ParamsResult, ResolvedRunnerConfig } from './types'

import prompt from './prompt'
import { actionKeyFor, loadGenerators } from './generators';
import { ShowHelpError } from './engine'
export const DEFAULT_ACTION = '_default'

const resolvePositionals = async (actionsMap: ActionsMap, args: string[]) => {
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

  if (generator && action && actionsMap.has(actionKeyFor(generator, action))) {
    return [generator, action, name]
  }

  if (generator && actionsMap.has(actionKeyFor(generator, DEFAULT_ACTION))) {
    action = DEFAULT_ACTION
    ;[generator, name] = args
  }

  return [generator, action, name]
}

const params = async (
  resolvedConfig: ResolvedRunnerConfig,
  externalArgv: string[],
): Promise<ParamsResult> => {
  const argv = yargs(externalArgv)
  const { templates, conflictResolutionStrategy, createPrompter } =
    resolvedConfig

  const { actionsMap } = loadGenerators(templates, conflictResolutionStrategy)

  // console.debug('generators', generators)
  // console.debug(`actionsMap (items: ${actionsMap.size})`, actionsMap.entries())

  const [generator, action, name] = await resolvePositionals(actionsMap, argv._)

  if (!generator || !action) {
    return { generator, action, templates }
  }

  const targetAction = actionsMap.get(actionKeyFor(generator, action))

  if (!targetAction) {
    // todo: improve this error
    throw new ShowHelpError(
      `The action ${targetAction} does not exist in the ${generator} generator`,
    )
  }

  const actionFolder = targetAction.path

  const { _, ...cleanArgv } = argv
  const promptArgs = await prompt(createPrompter, actionFolder, {
    // NOTE we might also want the rest of the generator/action/etc. params here
    // but theres no usecase yet
    ...(name ? { name } : {}),
    ...cleanArgv,
  })

  const [, subAction] = action.split(':')

  const args = Object.assign(
    {
      templates,
      actionFolder,
      generator,
      action,
      subAction,
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
