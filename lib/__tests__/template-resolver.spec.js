'use strict';

var _ftest = require('../test/ftest');

var _ftest2 = _interopRequireDefault(_ftest);

var _templatesResolver = require('../templates-resolver');

var _templatesResolver2 = _interopRequireDefault(_templatesResolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('resolve', function () {
  it('no file exists in 1/_templates so take "2"', function () {
    expect((0, _templatesResolver2.default)('1', '2')).toEqual('2');
  });

  (0, _ftest2.default)('when templates exist', { app: { _templates: { '1': 'foo' } } }, function () {
    expect((0, _templatesResolver2.default)('app', '2')).toEqual('app/_templates');
  });

  (0, _ftest2.default)('with custom HYGEN_TMPLS', { app: { other_templates: { '1': 'foo' } } }, function () {
    process.env.HYGEN_TMPLS = 'other_templates';
    expect((0, _templatesResolver2.default)('app', '2')).toEqual('app/other_templates');
    process.env.HYGEN_TMPLS = null;
  });
});