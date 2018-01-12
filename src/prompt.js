const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

const prompt = actionfolder => {
  const promptfile = path.join(actionfolder, 'prompt.js')
  if (!fs.existsSync(promptfile)) {
    return Promise.resolve({})
  }
  return inquirer
    .prompt(require(promptfile))
    .catch(x => console.log('error', x))
}

module.exports = prompt
