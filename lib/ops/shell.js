"use strict";

var _result = _interopRequireDefault(require("./result"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const notEmpty = x => x && x.length > 0;

const shell =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* ({
    attributes: {
      sh
    },
    body
  }, args, {
    logger,
    exec
  }) {
    const result = (0, _result.default)('shell', sh);

    if (notEmpty(sh)) {
      if (!args.dry) {
        yield exec(sh, body);
      }

      logger.ok(`       shell: ${sh}`);
      return result('executed');
    }

    return result('ignored');
  });

  return function shell(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = shell;