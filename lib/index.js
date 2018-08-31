"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const engine = require('./engine');

const resolve = require('./config-resolver');

const _require = require('./help'),
      printHelp = _require.printHelp,
      availableActions = _require.availableActions;

const runner =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (argv, config) {
    const resolvedConfig = yield resolve(config);
    const templates = resolvedConfig.templates,
          logger = resolvedConfig.logger;

    try {
      const actions = yield engine(argv, resolvedConfig);
      return {
        success: true,
        actions
      };
    } catch (err) {
      logger.log(err.toString());

      if (config.debug) {
        logger.log('details -----------');
        logger.log(err.stack);
        logger.log('-------------------');
      }

      printHelp(templates, logger);
      return {
        success: false,
        actions: [] // process.exit(1)

      };
    }
  });

  return function runner(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  runner,
  engine,
  resolve,
  printHelp,
  availableActions
};