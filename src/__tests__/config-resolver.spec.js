import ftest from '../test/ftest'
import templateResolver from '../config-resolver'
import fs from 'fs-extra'

describe('resolve', () => {
  it('no file exists in 1/_templates so take "2"', async () => {
    expect(
      (await templateResolver({ cwd: '/1', templates: '2' })).templates
    ).toEqual('2')
  })

  ftest(
    'when templates exist',
    { '/app': { _templates: { '1': 'foo' } } },

    async () => {
      console.log({ exists: await fs.readdir('/') })
      expect(
        (await templateResolver({ cwd: '/app', templates: '2' })).templates
      ).toEqual('/app/_templates')
    }
  )

  ftest(
    'with custom HYGEN_TMPLS',
    {
      app: { other_templates: { '1': 'foo' } },
      other_templates: { '2': 'foo' }
    },

    async () => {
      process.env.HYGEN_TMPLS = 'other_templates'
      expect(
        (await templateResolver({ cwd: '/app', templates: '2' })).templates
      ).toEqual('other_templates')
      process.env.HYGEN_TMPLS = null
    }
  )
})
