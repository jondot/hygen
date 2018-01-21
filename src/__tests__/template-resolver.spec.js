import ftest from '../test/ftest'
import templateResolver from '../templates-resolver'

describe('resolve', () => {
  it('no file exists in 1/_templates so take "2"', () => {
    expect(templateResolver({ cwd: '1', templates: '2' }).templates).toEqual(
      '2'
    )
  })

  ftest(
    'when templates exist',
    { app: { _templates: { '1': 'foo' } } },

    () => {
      expect(
        templateResolver({ cwd: 'app', templates: '2' }).templates
      ).toEqual('app/_templates')
    }
  )

  ftest(
    'with custom HYGEN_TMPLS',
    { app: { other_templates: { '1': 'foo' } } },

    () => {
      process.env.HYGEN_TMPLS = 'other_templates'
      expect(
        templateResolver({ cwd: 'app', templates: '2' }).templates
      ).toEqual('app/other_templates')
      process.env.HYGEN_TMPLS = null
    }
  )
})
