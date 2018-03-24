const path = require('path');

const fs = require('fs');

const L = require('lodash');

const hooksfiles = ['prompt.js', 'index.js'];

const prompt = (actionfolder, args) => {
  const hooksfile = L.first(L.filter(L.map(hooksfiles, f => path.resolve(path.join(actionfolder, f))), f => fs.existsSync(f)));

  if (!hooksfile) {
    return Promise.resolve({});
  } // shortcircuit without inquirer
  // $FlowFixMe


  const hooksModule = require(hooksfile);

  if (hooksModule.params) {
    return hooksModule.params({
      args
    });
  } // lazy loads inquirer (80ms load time)
  // everything below requires it


  const inquirer = require('inquirer');

  if (hooksModule.prompt) {
    return hooksModule.prompt({
      inquirer,
      args
    });
  }

  return inquirer.prompt(hooksModule);
};

module.exports = prompt;