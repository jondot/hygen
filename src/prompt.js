// @flow

const path = require('path')
const fs = require('fs')

const prompt = (actionfolder: string, args: Object) => {
  const promptfile = path.join(actionfolder, 'prompt.js')
  if (!fs.existsSync(promptfile)) {
    return Promise.resolve({})
  }
  const prompt = require(promptfile)
  // lazy loads inquirer (80ms load time)
  // $FlowFixMe
  if('function' === typeof prompt) {
    return require('inquirer').prompt(prompt(args))
  }
  return require('inquirer').prompt(prompt)
}

module.exports = prompt
