'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chalk = require('chalk');

var path = require('path');
var fs = require('fs-extra');

var execute = function execute(cwd, renderedActions, prompt, args) {
  var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(renderedActions), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var action = _step.value;

      var relativeTo = action.attributes.to;
      var to = path.join(cwd, relativeTo);
      var logger = opts.logger;


      if (!to) {
        logger.error(chalk.yellow('WARN: skipping ' + relativeTo + ', no \'to\' field provided in template.'));
      }
      if (fs.existsSync(to)) {
        // readline-sync doesn't accept ^C, we'll need to replace it.
        if ((prompt(chalk.red('      exists: ' + relativeTo + '. Overwrite? (y/N): ')) || 'n').toLowerCase() !== 'y') {
          logger.log(chalk.yellow('     skipped: ' + relativeTo));
          continue;
        }
      }
      if (!args.dry) {
        fs.ensureDirSync(path.dirname(to));
        fs.writeFileSync(to, action.body);
      }
      logger.log(chalk.green('       added: ' + relativeTo));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};
module.exports = execute;