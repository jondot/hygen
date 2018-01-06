'use strict';

var execute = require('../execute');
var ftest = require('../test/ftest');
var fs = require('fs-extra');
var chalk = require('chalk');

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

  ftest('with messages', {}, function () {
    var logs = [];
    execute('app', [{
      attributes: {
        to: 'workers/boot.js',
        message: 'hello from boot'
      },
      body: 'hello boot!'
    }, {
      attributes: {
        to: 'workers/index.js',
        message: 'hello from index'
      },
      body: 'hello index!'
    }], function () {}, {}, { logger: { log: function log(_) {
          return logs.push(_);
        } } });
    expect(logs.join('\n')).toEqual(chalk.green('       added: workers/boot.js') + '\n' + chalk.green('       added: workers/index.js') + '\n* hello from boot\n* hello from index');
  });

  ftest('with messages', {
    app: {
      Gemfile: 'source \'https://rubygems.org\'\n    gem \'rails\'\n    gem \'nokogiri\''
    }
  }, function () {
    var logs = [];
    execute('app', [{
      attributes: {
        to: 'Gemfile',
        inject: true,
        after: "gem 'rails'"
      },
      body: "    gem 'devise'"
    }], function () {}, {}, { logger: { log: function log(_) {
          return logs.push(_);
        } } });
    expect(fs.readFileSync('app/Gemfile').toString()).toEqual('source \'https://rubygems.org\'\n    gem \'rails\'\n    gem \'devise\'\n    gem \'nokogiri\'');
    expect(logs.join('\n')).toEqual('' + chalk.magenta('      inject: Gemfile'));
  });
});