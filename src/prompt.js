// @flow

const path = require('path')
const fs = require('fs')

const prompt = (actionfolder: string, args: Object) => {
  const promptfile = path.join(actionfolder, 'prompt.js')
  if (!fs.existsSync(promptfile)) {
    return Promise.resolve({})
  }
  // lazy loads inquirer (80ms load time)
  // $FlowFixMe
  const inquirer = require('inquirer')
  const promptModule = require(promptfile)
  const paramsfunc = promptModule.prompt || promptModule.params
  if (paramsfunc) {
    return paramsfunc({ inquirer, args })
  } else {
    return inquirer.prompt(promptModule)
  }
}

module.exports = prompt
