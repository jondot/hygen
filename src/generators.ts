import { lstatSync, readdirSync } from 'fs'
import { join as joinPath } from 'path'
import type {
  ActionsMap,
  GeneratorInfo,
  ResolvedTemplatePathConfig,
} from './types'
import { ConflictResolutionStrategy } from './types'

export const actionKeyFor = (generator: string, action: string) =>
  `${generator}::${action}`

let generators: GeneratorInfo[] = null
const actionsMap: ActionsMap = new Map()

function mapActions(
  generator: GeneratorInfo,
  conflictStrategy: ConflictResolutionStrategy,
) {
  for (const action of generator.actions) {
    const key = actionKeyFor(generator.name, action.name)

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
          actionsMap.set(key, generator)
      }
    }
  }
}

const loadGeneratorsForTemplate = (
  templatesFolder: ResolvedTemplatePathConfig,
): GeneratorInfo[] => {
  const generators = readdirSync(templatesFolder.path).filter((_) =>
    lstatSync(joinPath(templatesFolder.path, _)).isDirectory(),
  )

  return generators.reduce((acc, name) => {
    const path = joinPath(templatesFolder.path, name)
    const actions = readdirSync(path)

    acc.push({
      name,
      path,
      actions,
    })

    return acc
  }, [])
}

export function loadGenerators(
  templates: ResolvedTemplatePathConfig[],
  conflictStrategy: ConflictResolutionStrategy,
): { generators: GeneratorInfo[]; actionsMap: Map<string, GeneratorInfo> } {
  if (generators) return { generators, actionsMap }

  for (const templateFolder of templates) {
    generators = loadGeneratorsForTemplate(templateFolder)

    for (const generator of generators) {
      mapActions(generator, conflictStrategy)
    }
  }

  return {
    generators,
    actionsMap,
  }
}
