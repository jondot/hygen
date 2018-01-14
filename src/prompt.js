// @flow

const path = require('path')
const fs = require('fs')

const prompt = (actionfolder: string) => {
  const promptfile = path.join(actionfolder, 'prompt.js')
  if (!fs.existsSync(promptfile)) {
    return Promise.resolve({})
  }
  // lazy loads inquirer (80ms load time)
  // $FlowFixMe
  return require('inquirer').prompt(require(promptfile))
}

module.exports = prompt
