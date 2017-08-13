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
    () => {
      const args = params('app', 'dont-take-this', ['foo', 'bar', 'baz'])
      expect(args).toMatchSnapshot()
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
    () => {
      process.env.HYGEN_TMPLS = 'tmpls'
      const args = params('app', 'dont-take-this', ['foo', 'bar', 'baz'])
      expect(args).toMatchSnapshot()
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
    () => {
      const args = params('app', 'famboozle', ['foo', 'bar', 'baz'])
      expect(args).toMatchSnapshot()
    }
  )
})
