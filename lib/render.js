"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const L = require('lodash');

const fs = require('fs-extra');

const ejs = require('ejs');

const fm = require('front-matter');

const path = require('path');

const context = require('./context'); // for some reason lodash/fp takes 90ms to load.
// inline what we use here with the regular lodash.


const map = f => arr => L.map(arr, f);

const filter = f => arr => L.filter(arr, f);

const ignores = ['prompt.js', 'index.js'];

const renderTemplate = (tmpl, locals, config) => L.isString(tmpl) ? ejs.render(tmpl, context(locals, config)) : tmpl;

const render =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (args, config) {
    return yield fs.readdir(args.actionfolder).then(things => things.sort((a, b) => a.localeCompare(b))).then(map(_ => path.join(args.actionfolder, _))).then(filter(f => !L.find(ignores, ig => L.endsWith(f, ig)))).then(map(file => fs.lstat(file).then(stat => ({
      file,
      stat
    })))).then(_ => Promise.all(_)).then(filter(({
      file,
      stat
    }) => stat.isFile() && (args.subaction ? file.match(args.subaction) : true))).then(map(({
      file
    }) => file)).then(map(file => fs.readFile(file).then(text => ({
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
      attributes: L.mapValues(attributes, _ => renderTemplate(_, args, config)),
      body: renderTemplate(body, args, config)
    })));
  });

  return function render(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = render;