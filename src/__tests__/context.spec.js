const context = require('../context')
describe('context', () => {
  it('should populate with capitalized keys', () => {
    expect(context({ name: 'foobar' })).toMatchSnapshot()
  })
})
