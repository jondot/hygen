import { lstatSync, readdirSync } from 'fs'
import { join as joinPath } from 'path'
import type {
  ActionsMap,
  GeneratorInfo,
  ResolvedTemplatePathConfig,
} from './types'
import { ConflictResolutionStrategy } from './types'

const removeExtension = (file: string) => file.replace(/\.[cm]?[jt]s[x]?$/, '')

export const actionKeyFor = (generator: string, action: string) =>
  `${generator}::${removeExtension(action)}`

const generators = new Map<string, GeneratorInfo>()
const actionsMap: ActionsMap = new Map()

const registerAction = (generatorName: string, name: string, path: string) =>
  actionsMap.set(actionKeyFor(generatorName, name), {
    name,
    path,
    generatorName,
  })

function resolveActionConflicts(
  generator: GeneratorInfo,
  conflictStrategy: ConflictResolutionStrategy,
) {
  for (const action of generator.actions) {
    const key = actionKeyFor(generator.name, action.name)
    // console.debug('action map:', action.name, ' - ', key)

    if (actionsMap.has(key)) {
      switch (conflictStrategy) {
        case ConflictResolutionStrategy.FAIL:
          throw new Error(`
Action conflict: "${key}" defined by ${generator.path} was already
defined by ${actionsMap.get(action.name).path}.

You are seeing this error because the 'conflictResolutionMode' is set to 'fail'.
Update that value in your hygen config to

- "override" if you want to keep the action is defined last
- "skip" to keep the action that appears first
        `)

        case ConflictResolutionStrategy.SKIP:
          continue

        case ConflictResolutionStrategy.OVERRIDE:
          registerAction(generator.name, action.name, action.path)
      }
    } else {
      registerAction(generator.name, action.name, action.path)
    }
  }
}

/**
 * Pushes the generators of the template at {@link templateFolder}
 * into the module private variable {@link generators} while resolving
 * action conflicts
 */
const loadGeneratorsForTemplate = (
  templatesFolder: ResolvedTemplatePathConfig,
  conflictStrategy: ConflictResolutionStrategy,
): void => {
  const tplGenerators = readdirSync(templatesFolder.path).filter((_) =>
    lstatSync(joinPath(templatesFolder.path, _)).isDirectory(),
  )

  for (const name of tplGenerators) {
    const path = joinPath(templatesFolder.path, name)
    const actions = readdirSync(path)

    const info: GeneratorInfo = {
      name,
      path,
      actions: actions.map((action) => ({
        name: action,
        path: joinPath(path, removeExtension(action)),
        generatorName: name,
      })),
    }

    resolveActionConflicts(info, conflictStrategy)
    generators.set(name, info)
  }
}

export function loadGenerators(
  templates: ResolvedTemplatePathConfig[],
  conflictStrategy: ConflictResolutionStrategy,
): {
  generators: Map<string, GeneratorInfo>
  actionsMap: ActionsMap
} {
  if (generators.size) return { generators, actionsMap }

  for (const templateFolder of templates) {
    loadGeneratorsForTemplate(templateFolder, conflictStrategy)
  }

  return {
    generators,
    actionsMap,
  }
}
