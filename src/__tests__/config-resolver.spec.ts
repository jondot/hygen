import path from 'path'
import templateResolver from '../config-resolver'
import Logger from '../logger'

const fixture = (dir) => path.join(__dirname, 'fixtures/templates', dir)
const templateParams = ({
  cwd,
  templates,
}: {
  cwd: string
  templates: string
}) => {
  return {
    cwd,
    templates,
    exec: () => {},
    logger: new Logger(console.log),
    debug: false,
    helpers: {},
    createPrompter: () => require('enquirer'),
  }
}
describe('resolve', () => {
  it('no file exists in 1/_templates so take "2"', async () => {
    expect(
      (await templateResolver(templateParams({ cwd: '/1', templates: '2' })))
        .templates,
    ).toEqual('2')
  })

  it('when templates exist', async () => {
    expect(
      (
        await templateResolver(
          templateParams({ cwd: fixture('app'), templates: '2' }),
        )
      ).templates,
    ).toEqual(fixture('/app/_templates'))
  })

  it('take other_templates if explicitly given', async () => {
    process.env.HYGEN_TMPLS = fixture('app-custom/other-templates')
    expect(
      (
        await templateResolver(
          templateParams({ cwd: fixture('app-custom'), templates: '2' }),
        )
      ).templates,
    ).toEqual(fixture('app-custom/other-templates'))
    process.env.HYGEN_TMPLS = null
  })
})
