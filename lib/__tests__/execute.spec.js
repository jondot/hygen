'use strict';

var execute = require('../execute');
var ftest = require('../test/ftest');
var fs = require('fs-extra');

describe('execute', function () {
  ftest('works', {
    app: {}
  }, function () {
    execute('app', [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }], function () {
      throw new Error('prompt!');
    }, {}, { logger: { log: function log(_) {
          return _;
        } } });

    expect(fs.readFileSync('app/workers/foobar.js').toString()).toMatch(/hello js!/);
  });

  ftest('skips, prompt=n', {
    app: { workers: { 'foobar.js': 'foobar' } }
  }, function () {
    execute('app', [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }], function () {
      return 'n';
    }, {}, { logger: { log: function log(_) {
          return _;
        } } });
  });

  ftest('overwrite, prompt=y', {
    app: { workers: { 'foobar.js': 'foobar' } }
  }, function () {
    var flagged = false;
    execute('app', [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }], function () {
      flagged = true;
      return 'y';
    }, {}, { logger: { log: function log(_) {
          return _;
        } } });
    expect(flagged).toBe(true);
  });
});