"use strict";

const path = require('path');

const fs = require('fs');

const L = require('lodash');

const hooksfiles = ['prompt.js', 'index.js'];

const prompt = (createPrompter, actionfolder, args) => {
  const hooksfile = L.first(L.filter(L.map(hooksfiles, f => path.resolve(path.join(actionfolder, f))), f => fs.existsSync(f)));

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

  return prompter.prompt(hooksModule);
};

module.exports = prompt;