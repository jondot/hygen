"use strict";

const path = require('path');

const fs = require('fs');

const hooksfiles = ['prompt.js', 'index.js'];

const prompt = (createPrompter, actionfolder, args) => {
  const hooksfile = hooksfiles.map(f => path.resolve(path.join(actionfolder, f))).find(f => fs.existsSync(f));

  if (!hooksfile) {
    return Promise.resolve({});
  } // shortcircuit without prompter
  // $FlowFixMe


  const hooksModule = require(hooksfile);

  if (hooksModule.params) {
    return hooksModule.params({
      args
    });
  } // lazy loads prompter
  // everything below requires it


  const prompter = createPrompter();

  if (hooksModule.prompt) {
    return hooksModule.prompt({
      prompter,
      inquirer: prompter,
      args
    });
  }

  return prompter.prompt( // prompt _only_ for things we've not seen on the CLI
  hooksModule.filter(p => args[p.name] === undefined || args[p.name] === null || args[p.name].length === 0));
};

module.exports = prompt;