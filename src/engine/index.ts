import fs from 'fs-extra'
import { ActionResult, RunnerConfig } from '../types'
import params from '../params'
import {
  getNoGeneratorError,
  getNoActionError,
  getActionNotFoundError,
} from '../errors'

const getHelp = () => `
Usage:
  hygen [option] GENERATOR ACTION [--name NAME] [data-options]

Options:
  -h, --help # Show this message and quit
  --dry      # Perform a dry run.  Files will be generated but not saved.`

const engine = async (
  argv: string[],
  config: RunnerConfig,
): Promise<ActionResult[]> => {
  const { cwd, templates, logger } = config
  const args = Object.assign(await params(config, argv), { cwd })
  const { generator, action, actionfolder } = args

  if (['-h', '--help'].includes(argv[0])) {
    logger.log(getHelp())

    process.exit(0)
  }

  logger.log(args.dry ? '(dry mode)' : '')
  if (!generator) {
    throw getNoGeneratorError()
  }

  if (!action) {
    throw getNoActionError()
  }

  logger.log(`Loaded templates: ${templates.replace(`${cwd}/`, '')}`)
  if (!(await fs.exists(actionfolder))) {
    throw getActionNotFoundError(generator, action)
  }

  // lazy loading these dependencies gives a better feel once
  // a user is exploring hygen (not specifying what to execute)
  const execute = (await import('../execute')).default
  const render = (await import('../render')).default

  const renderedActions = await render(args, config)

  return execute(renderedActions, args, config)
}

export { ShowHelpError } from '../errors'
export default engine
