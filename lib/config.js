"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reversePathsToWalk = exports.ConfigResolver = exports.configLookup = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// inline fp methods due to perf
const uniq = arr => arr.filter((elem, pos, a) => a.indexOf(elem) === pos);

const reversePathsToWalk = ({
  folder,
  path
}) => {
  const resolved = path.resolve(folder);
  const parts = resolved.split(path.sep);
  const results = parts.map((n, idx, arr) => arr.slice(0, idx + 1).join(path.sep));
  results[0] = results[0] || '/';
  return results.reverse();
};

exports.reversePathsToWalk = reversePathsToWalk;

const configLookup = (file, folder, path = _path.default) => uniq(reversePathsToWalk({
  folder,
  path
}).map(p => path.join(p, file)));

exports.configLookup = configLookup;

class ConfigResolver {
  constructor(configFile, io) {
    _defineProperty(this, "configFile", void 0);

    _defineProperty(this, "io", void 0);

    this.configFile = configFile;
    this.io = io;
  }

  resolve(from) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const configCandidates = configLookup(_this.configFile, from);
      const _this$io = _this.io,
            exists = _this$io.exists,
            load = _this$io.load,
            none = _this$io.none;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = configCandidates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const candidate = _step.value;

          if (yield exists(candidate)) {
            return yield load(candidate);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return yield none(from);
    })();
  }

}

exports.ConfigResolver = ConfigResolver;