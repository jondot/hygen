import path from 'path'
import params from '../params'

const fixture = (...segments) =>
  path.join(__dirname, 'fixtures', 'templates', ...segments)

describe('params', () => {
  process.env.HYGEN_TS = '1337'

  beforeEach(() => {
    process.env.HYGEN_TMPLS = ''
  })

  // todo: figure out the intention and re-enable this test
  it('dont take template folder in template', async () => {
    const args = await params(
      {
        templates: [
          {
            path: fixture('app-custom'),
            prefix: '',
            pathChecked: false,
          },
        ],
      },
      ['dont-take-this', 'foo', 'bar', 'baz'],
    )
    expect(args).toEqual({
      _: ['dont-take-this', 'foo', 'bar', 'baz'],
      action: 'foo',
      name: 'bar',
      subAction: undefined,
      actionFolder: fixture('app-custom', 'dont-take-this', 'foo'),
      generator: 'dont-take-this',
      templates: [
        {
          path: fixture('app-custom'),
          pathChecked: false,
          prefix: '',
        },
      ],
      ts: '1337',
    })
  })

  // todo: figure out the intention and re-enable this test
  it('env var overrides local templates but still take explicitly given templates', async () => {
    process.env.HYGEN_TMPLS = fixture('app-custom', 'tmpls')
    const args = await params(
      {
        templates: [
          {
            path: fixture('app-custom'),
            prefix: '',
            pathChecked: false,
          },
        ],
      },
      ['dont-take-this', 'foo', 'bar', 'baz'],
    )
    expect(args).toEqual({
      _: ['dont-take-this', 'foo', 'bar', 'baz'],
      action: 'foo',
      name: 'bar',
      subAction: undefined,
      generator: 'dont-take-this',
      actionFolder: fixture('app-custom', 'dont-take-this', 'foo'),
      templates: [
        {
          path: fixture('app-custom'),
          pathChecked: false,
          prefix: '',
        },
      ],
      ts: '1337',
    })
  })
})
