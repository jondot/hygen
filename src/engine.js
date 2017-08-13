const fs = require('fs-extra')
const prompt = require('prompt-sync')({ sigint: true })
const render = require('./render')
const params = require('./params')
const execute = require('./execute')

const engine = (cwd, templates, logger, externalArgv = null) => {
  const args = params(templates, externalArgv)
  const { generator, action, actionfolder } = args

  logger.log(args.dry ? '(dry mode)' : '')
  if (!generator) {
    throw new Error('please specify a generator.')
  }

  if (!action) {
    throw new Error(`please specify an action for ${generator}.`)
  }

  logger.log(`Loaded templates: ${templates.replace(cwd + '/', '')}`)
  if (!fs.existsSync(actionfolder)) {
    throw new Error(
      `cannot find action '${action}' for generator '${generator}' (looked for ${generator}/${action} in ${templates}).`
    )
  }

  execute(cwd, render(args)(actionfolder), prompt, args, { logger })
}

module.exports = engine
