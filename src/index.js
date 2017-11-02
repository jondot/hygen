// @flow

const engine = require('./engine')
const resolve = require('./templates-resolver')
const { printHelp } = require('./help')
const runner = (defaultTemplates: string) => {
  const cwd = process.cwd()
  const templates = resolve(cwd, defaultTemplates)
  try {
    engine(cwd, templates, console)
  } catch (err) {
    console.log(err.toString())
    printHelp(templates, console)
    process.exit(1)
  }
}

module.exports = {
  runner,
  engine,
  resolve,
  printHelp
}
