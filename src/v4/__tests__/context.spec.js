const context = require('src/v4/context')

describe('context', () => {
  it('should populate with capitalized keys', () => {
    expect(context({ name: 'foobar' })).toMatchSnapshot()
  })
})
