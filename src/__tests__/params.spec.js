const params = require('../params')
const ftest = require('../test/ftest')
describe('params', () => {
  beforeEach(() => {
    process.env.HYGEN_TMPLS = null
  })
  ftest(
    'underscored templates',
    {
      app: {
        _templates: {
          some: 'file'
        }
      }
    },
    async () => {
      const args = await params('app', 'dont-take-this', ['foo', 'bar', 'baz'])
      expect(args).toEqual({
        action: undefined,
        generator: 'dont-take-this',
        templates: 'app'
      })
    }
  )

  ftest(
    'env var overrides local templates',
    {
      app: {
        _templates: {
          some: 'file'
        },
        tmpls: {
          some: 'otherfile'
        }
      }
    },
    async () => {
      process.env.HYGEN_TMPLS = 'tmpls'
      const args = await params('app', 'dont-take-this', ['foo', 'bar', 'baz'])
      expect(args).toEqual({
        action: undefined,
        generator: 'dont-take-this',
        templates: 'app'
      })
    }
  )

  ftest(
    'takes default folder',
    {
      app: {
        tmpls: {
          some: 'otherfile'
        },
        famboozle: {
          some: 'stupidfile'
        }
      }
    },
    async () => {
      const args = await params('app', 'famboozle', ['foo', 'bar', 'baz'])
      expect(args).toEqual({
        action: undefined,
        generator: 'famboozle',
        templates: 'app'
      })
    }
  )
})
