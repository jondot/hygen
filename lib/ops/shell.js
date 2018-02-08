function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

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
    if (notEmpty(sh)) {
      if (!args.dry) {
        yield exec(sh, body);
      }

      logger.ok(`       shell: ${sh}`);
    }
  });

  return function shell(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = shell;