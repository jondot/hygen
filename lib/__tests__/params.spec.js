'use strict';

var params = require('../params');
var ftest = require('../test/ftest');
describe('params', function () {
  beforeEach(function () {
    process.env.HYGEN_TMPLS = null;
  });
  ftest('underscored templates', {
    app: {
      _templates: {
        some: 'file'
      }
    }
  }, function () {
    var args = params('app', 'dont-take-this', ['foo', 'bar', 'baz']);
    expect(args).toMatchSnapshot();
  });

  ftest('env var overrides local templates', {
    app: {
      _templates: {
        some: 'file'
      },
      tmpls: {
        some: 'otherfile'
      }
    }
  }, function () {
    process.env.HYGEN_TMPLS = 'tmpls';
    var args = params('app', 'dont-take-this', ['foo', 'bar', 'baz']);
    expect(args).toMatchSnapshot();
  });

  ftest('takes default folder', {
    app: {
      tmpls: {
        some: 'otherfile'
      },
      famboozle: {
        some: 'stupidfile'
      }
    }
  }, function () {
    var args = params('app', 'famboozle', ['foo', 'bar', 'baz']);
    expect(args).toMatchSnapshot();
  });
});