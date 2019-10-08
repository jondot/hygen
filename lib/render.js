"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const fs = require('fs-extra');

const ejs = require('ejs');

const fm = require('front-matter');

const path = require('path');

const _require = require('path'),
      resolve = _require.resolve;

const walk = require('ignore-walk');

const context = require('./context'); // for some reason lodash/fp takes 90ms to load.
// inline what we use here with the regular lodash.


const map = f => arr => arr.map(f);

const filter = f => arr => arr.filter(f);

const ignores = ['prompt.js', 'index.js', '.hygenignore', '.DS_Store', '.Spotlight-V100', '.Trashes', 'ehthumbs.db', 'Thumbs.db'];

const renderTemplate = (tmpl, locals, config) => typeof tmpl === 'string' ? ejs.render(tmpl, context(locals, config)) : tmpl;

function getFiles(_x) {
  return _getFiles.apply(this, arguments);
}

function _getFiles() {
  _getFiles = _asyncToGenerator(function* (dir) {
    const files = walk.sync({
      path: dir,
      ignoreFiles: ['.hygenignore']
    }).map(f => path.join(dir, f));
    return files;
  });
  return _getFiles.apply(this, arguments);
}

const render =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (args, config) {
    return yield getFiles(args.actionfolder).then(things => things.sort((a, b) => a.localeCompare(b))) // TODO: add a test to verify this sort
    .then(filter(f => !ignores.find(ig => f.endsWith(ig)))) // TODO: add a
    // test for ignoring prompt.js and index.js
    .then(filter(file => args.subaction ? file.match(args.subaction) : true)).then(map(file => fs.readFile(file).then(text => ({
      file,
      text: text.toString()
    })))).then(_ => Promise.all(_)).then(map(({
      file,
      text
    }) => Object.assign({
      file
    }, fm(text)))).then(map(({
      file,
      attributes,
      body
    }) => ({
      file,
      attributes: Object.entries(attributes).reduce((obj, [key, value]) => (obj[key] = renderTemplate(value, args, config)) && obj, {}),
      body: renderTemplate(body, args, config)
    })));
  });

  return function render(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = render;