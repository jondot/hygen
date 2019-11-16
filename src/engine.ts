import fs from 'fs-extra'
import { ActionResult, RunnerConfig } from './types'
import params from './params'
import { mainHelp } from './help/main-help'
import { templatesHelp } from './help/templates-help';

const engine = async (
  argv: string[],
  config: RunnerConfig,
): Promise<ActionResult[]> => {
  const { cwd, templates, logger } = config
  const args = Object.assign(await params(config, argv), { cwd })
  const { generator, action, actionfolder } = args

  if (['-h', '--help'].includes(argv[0])) {
    logger.log(mainHelp());
    process.exit(0)
  }

  if (['--help-templates'].includes(argv[0])) {
    logger.log(templatesHelp());
    process.exit(0)
  }

  logger.log(args.dry ? '(dry mode)' : '')
  if (!generator) {
    throw new Error('please specify a generator.')
  }

  if (!action) {
    throw new Error(`please specify an action for ${generator}.`)
  }

  logger.log(`Loaded templates: ${templates.replace(`${cwd}/`, '')}`)
  if (!(await fs.exists(actionfolder))) {
    throw new Error(`I can't find action '${action}' for generator '${generator}'.

      You can try:
      1. 'hygen init self' to initialize your project, and
      2. 'hygen generator new --name ${generator}' to build the generator you wanted.

      Check out the quickstart for more: http://www.hygen.io/quick-start
      `)
  }

  // lazy loading these dependencies gives a better feel once
  // a user is exploring hygen (not specifying what to execute)
  const execute = require('./execute')
  const render = require('./render')
  return execute(await render(args, config), args, config)
}

export default engine
