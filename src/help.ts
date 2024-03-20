import { bold } from 'chalk'
import type {
  Logger,
  ResolvedRunnerConfig,
  ResolvedTemplatePathConfig,
} from './types'
import { DEFAULT_ACTION } from './params'
import { loadGenerators } from './generators'
import { ConflictResolutionStrategy } from './types'

const pkg = require('../package.json') // eslint-disable-line @typescript-eslint/no-var-requires

const VERSION = pkg.version

let _availableActions: Record<string, string[]>

const availableActions = (
  templates: ResolvedTemplatePathConfig[],
  conflictStrategy = ConflictResolutionStrategy.FAIL,
): Record<string, string[]> => {
  if (_availableActions) return _availableActions

  const { generators } = loadGenerators(templates, conflictStrategy)

  return Array.from(generators.values()).reduce((acc, generator) => {
    acc[generator.name] = generator.actions.map((a) => a.name)
    return acc
  }, {})
}

const printHelp = (config: ResolvedRunnerConfig, logger: Logger) => {
  logger.log(`Hygen v${VERSION}`)
  logger.log('\nAvailable actions:')

  const actionsByGenerator = availableActions(
    config.templates,
    config.conflictResolutionStrategy,
  )

  // todo: this needs to be refactored
  // config-resolver is now throwing in certain cases
  if (!Object.keys(actionsByGenerator).length) {
    logger.log(`No generators or actions found.

      This means I didn't find a _templates folder right here,
      or anywhere up the folder tree starting here.

      Here's how to start using Hygen:

      $ hygen init self
      $ hygen with-prompt new --name my-generator

      (edit your generator in _templates/my-generator)

      $ hygen my-generator

      See https://hygen.io for more.

      `)
    return
  }

  for (const [generator, actions] of Object.entries(actionsByGenerator)) {
    logger.log(
      `${bold(generator)}: ${
        actions.find((name) => name === DEFAULT_ACTION)
          ? `${generator}${actions.length > 1 ? ',' : ''} `
          : ''
      }${actions
        .filter((name) => name !== DEFAULT_ACTION)
        .map((action) => `${generator} ${action}`)
        .join(', ')}`,
    )
  }
}

export { availableActions, printHelp, VERSION }
