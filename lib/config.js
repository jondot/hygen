"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigResolver = exports.configLookup = void 0;

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

// inline fp methods due to perf
const reduce = (f, init) => arr => _lodash.default.reduce(arr, f, init);

const reversePathsToWalk = _lodash.default.flow(f => _path.default.resolve(f), f => f.split(_path.default.sep), reduce((acc, p) => p === '' ? [_path.default.sep] : [...acc, _path.default.join(_lodash.default.last(acc), p)], []), _lodash.default.reverse);

const configLookup = (file, folder) => _lodash.default.map(reversePathsToWalk(folder), p => _path.default.join(p, file));

exports.configLookup = configLookup;

class ConfigResolver {
  constructor(configFile, io) {
    Object.defineProperty(this, "configFile", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "io", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
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