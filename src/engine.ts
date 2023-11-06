import fs from 'fs-extra'
import type { ActionResult, RunnerConfig } from './types'
import { params, configfile } from './params'

class ShowHelpError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, ShowHelpError.prototype)
  }
}

const engine = async (
  argv: string[],
  config: RunnerConfig,
): Promise<ActionResult[]> => {
  const { cwd, templates, logger } = config
  const args = Object.assign(await params(config, argv), { cwd })
  const { generator, action, actionfolder } = args

  if (['-h', '--help'].includes(argv[0])) {
    logger.log(`
Usage:
  hygen [option] GENERATOR ACTION [--name NAME] [data-options]

Options:
  -h, --help   # Show this message and quit
  --dry        # Perform a dry run.  Files will be generated but not saved.
  --configfile # Load this file as the local parameters for the template`)
    process.exit(0)
  }

  logger.log(args.dry ? '(dry mode)' : '')
  if (!generator) {
    throw new ShowHelpError('please specify a generator.')
  }

  if (!action) {
    throw new ShowHelpError(`please specify an action for ${generator}.`)
  }

  logger.log(`Loaded templates: ${templates.replace(`${cwd}/`, '')}`)
  if (!(await fs.exists(actionfolder))) {
    console.log(actionfolder)
    throw new ShowHelpError(`I can't find action '${action}' for generator '${generator}'.

      You can try:
      1. 'hygen init self' to initialize your project, and
      2. 'hygen generator new --name ${generator}' to build the generator you wanted.

      Check out the quickstart for more: https://hygen.io/docs/quick-start
      `)
  }
  if (args.configfile) {
    config.localsDefaults = configfile(args.configfile)
  }

  // lazy loading these dependencies gives a better feel once
  // a user is exploring hygen (not specifying what to execute)
  const execute = (await import('./execute')).default
  const render = (await import('./render')).default
  return execute(await render(args, config), args, config)
}

export { ShowHelpError }
export default engine
