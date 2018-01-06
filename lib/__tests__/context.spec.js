'use strict';

var context = require('../context');
describe('context', function () {
  it('should populate with capitalized keys', function () {
    expect(context({ name: 'foobar' })).toMatchSnapshot();
  });
});