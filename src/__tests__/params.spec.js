const path = require('path')
const params = require('../params')

const fixture = dir => path.join(__dirname, 'fixtures/templates', dir)

describe('params', () => {
  beforeEach(() => {
    process.env.HYGEN_TMPLS = null
  })
  it('dont take template folder in template', async () => {
    const args = await params(
      { templates: fixture('template-folder-in-templates/_templates') },
      'dont-take-this',
      ['foo', 'bar', 'baz']
    )
    expect(args).toEqual({
      action: undefined,
      generator: 'dont-take-this',
      templates: fixture('template-folder-in-templates/_templates')
    })
  })

  it('env var overrides local templates but still take explicitly given templates', async () => {
    process.env.HYGEN_TMPLS = fixture('templates-override/tmpls')
    const args = await params(
      { templates: fixture('templates-override/_templates') },
      'dont-take-this',
      ['foo', 'bar', 'baz']
    )
    expect(args).toEqual({
      action: undefined,
      generator: 'dont-take-this',
      templates: fixture('templates-override/_templates')
    })
  })
})
