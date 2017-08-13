'use strict';

var execute = require('../execute');
var ftest = require('../test/ftest');
var fs = require('fs');

describe('execute', function () {
  ftest('works', {
    app: {}
  }, function () {
    execute('app', [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }], function () {
      throw new Error('prompt!');
    }, {}, { logger: console });

    expect(fs.readFileSync('app/workers/foobar.js').toString()).toMatchSnapshot();
  });

  ftest('skips, prompt=n', {
    app: { workers: { 'foobar.js': 'foobar' } }
  }, function () {
    execute('app', [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }], function () {
      return 'n';
    }, {}, { logger: console });
  });

  ftest('overwrite, prompt=y', {
    app: { workers: { 'foobar.js': 'foobar' } }
  }, function () {
    var flagged = false;
    execute('app', [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }], function () {
      flagged = true;
      return 'y';
    }, {}, { logger: console });
    expect(flagged).toBe(true);
  });
});