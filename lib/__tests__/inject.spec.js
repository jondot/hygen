'use strict';

var inject = require('../inject');
var gemfile = '\n    source \'http://rubygems.org\'\n    gem \'rails\'\n    gem \'nokogiri\'\n    gem \'httparty\'\n\n    ';
describe('inject', function () {
  it('before', function () {
    expect(inject({
      attributes: {
        before: "gem 'rails'"
      },
      body: "    gem 'kamikaze' # added by hygen"
    }, gemfile)).toMatchSnapshot();
  });
  it('after', function () {
    expect(inject({
      attributes: {
        after: "gem 'rails'"
      },
      body: "    gem 'kamikaze' # added by hygen"
    }, gemfile)).toMatchSnapshot();
  });
  it('prepend', function () {
    expect(inject({
      attributes: {
        prepend: true
      },
      body: "    gem 'kamikaze' # added by hygen"
    }, gemfile)).toMatchSnapshot();
  });
  it('append', function () {
    expect(inject({
      attributes: {
        append: true
      },
      body: "    gem 'kamikaze' # added by hygen"
    }, gemfile)).toMatchSnapshot();
  });
  it('at_index', function () {
    expect(inject({
      attributes: {
        at_line: 2
      },
      body: "    gem 'kamikaze' # added by hygen"
    }, gemfile)).toMatchSnapshot();
  });
  it('skip_if', function () {
    expect(inject({
      attributes: {
        skip_if: 'source',
        after: "gem 'rails'"
      },
      body: "    gem 'kamikaze' # added by hygen"
    }, gemfile)).toMatchSnapshot();
  });
});