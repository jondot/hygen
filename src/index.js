// @flow

const engine = require('./engine')
const resolve = require('./templates-resolver')
const { printHelp } = require('./help')
const runner = async (defaultTemplates: string) => {
  const cwd = process.cwd()
  const templates = resolve(cwd, defaultTemplates)
  try {
    await engine(cwd, templates, console)
  } catch (err) {
    throw err
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
