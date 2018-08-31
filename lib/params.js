"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const L = require('lodash');

const path = require('path');

const yargs = require('yargs-parser');

const prompt = require('./prompt');

const params =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* ({
    templates,
    createPrompter
  }, externalArgv) {
    const argv = yargs(externalArgv);

    const _argv$_ = _slicedToArray(argv._, 2),
          generator = _argv$_[0],
          action = _argv$_[1];

    if (!generator || !action) {
      return {
        generator,
        action,
        templates
      };
    }

    const _L$split = L.split(action, ':'),
          _L$split2 = _slicedToArray(_L$split, 2),
          mainAction = _L$split2[0],
          subaction = _L$split2[1];

    const actionfolder = path.join(templates, generator, mainAction);
    const promptArgs = yield prompt(createPrompter, actionfolder, L.omit(argv, ['_']));
    const args = Object.assign({
      templates,
      actionfolder,
      generator,
      action,
      subaction
    }, promptArgs, L.omit(argv, ['_']));
    return args;
  });

  return function params(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = params;