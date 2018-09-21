import path from 'path'
import templateResolver from '../config-resolver'

const fixture = dir => path.join(__dirname, 'fixtures/templates', dir)

describe('resolve', () => {
  it('no file exists in 1/_templates so take "2"', async () => {
    expect(
      (await templateResolver({ cwd: '/1', templates: '2' })).templates
    ).toEqual('2')
  })

  it('when templates exist', async () => {
    expect(
      (await templateResolver({ cwd: fixture('app'), templates: '2' }))
        .templates
    ).toEqual(fixture('/app/_templates'))
  })

  it('take other_templates if explicitly given', async () => {
    process.env.HYGEN_TMPLS = fixture('app-custom/other-templates')
    expect(
      (await templateResolver({ cwd: fixture('app-custom'), templates: '2' }))
        .templates
    ).toEqual(fixture('app-custom/other-templates'))
    process.env.HYGEN_TMPLS = null
  })
})
