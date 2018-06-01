// @flow

import type { Prompter } from './types'
const path = require('path')
const fs = require('fs')
const L = require('lodash')

const hooksfiles = ['prompt.js', 'index.js']
const prompt = (
  createPrompter: () => Prompter,
  actionfolder: string,
  args: Object
): Promise<any> => {
  const hooksfile = L.first(
    L.filter(
      L.map(hooksfiles, f => path.resolve(path.join(actionfolder, f))),
      f => fs.existsSync(f)
    )
  )
  if (!hooksfile) {
    return Promise.resolve({})
  }

  // shortcircuit without inquirer
  // $FlowFixMe
  const hooksModule = require(hooksfile)
  if (hooksModule.params) {
    return hooksModule.params({ args })
  }

  // lazy loads inquirer (80ms load time)
  // everything below requires it
  const prompter = createPrompter()
  if (hooksModule.prompt) {
    return hooksModule.prompt({ inquirer: prompter, args })
  }
  return prompter.prompt(hooksModule)
}

module.exports = prompt
