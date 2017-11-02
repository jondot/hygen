import ftest from '../test/ftest'
import templateResolver from '../templates-resolver'

describe('resolve', () => {
  it('no file exists in 1/_templates so take "2"', () => {
    expect(templateResolver('1', '2')).toEqual('2')
  })

  ftest(
    'when templates exist',
    { app: { _templates: { '1': 'foo' } } },

    () => {
      expect(templateResolver('app', '2')).toEqual('app/_templates')
    }
  )

  ftest(
    'with custom HYGEN_TMPLS',
    { app: { other_templates: { '1': 'foo' } } },

    () => {
      process.env.HYGEN_TMPLS = 'other_templates'
      expect(templateResolver('app', '2')).toEqual('app/other_templates')
      process.env.HYGEN_TMPLS = null
    }
  )
})
