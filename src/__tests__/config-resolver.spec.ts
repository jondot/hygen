import path from 'path'
import templateResolver from '../config-resolver'
import Logger from '../logger'

const fixture = (dir) => path.join(__dirname, 'fixtures/templates', dir)
const templateParams = ({
  cwd,
  templates,
  templatesOverride,
}: {
  cwd: string
  templates: string
  templatesOverride?: string | undefined
}) => {
  return {
    cwd,
    templates,
    templatesOverride,
    exec: () => {},
    logger: new Logger(console.log), // eslint-disable-line no-console
    debug: false,
    helpers: {},
    createPrompter: () => require('enquirer'),
  }
}
describe('resolve', () => {
  let consoleWarnMock

  beforeEach(() => {
    consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleWarnMock.mockReset()
  })

  it('template overrides takes over all', async () => {
    const resolvedTemplates = (
      await templateResolver(
        templateParams({
          cwd: '/1',
          templates: fixture('app'),
          templatesOverride: fixture('app-custom/other-templates'),
        }),
      )
    ).templates

    expect(resolvedTemplates).toHaveLength(1)
    expect(resolvedTemplates[0].path).toEqual(
      fixture('app-custom/other-templates'),
    )
  })

  it('templates explicitly given via config, so take it if it exists', async () => {
    expect(
      (
        await templateResolver(
          templateParams({
            cwd: '/1',
            templates: fixture('app-custom/other-templates'),
          }),
        )
      ).templates[0].path,
    ).toEqual(fixture('app-custom/other-templates'))
  })

  it('when templates exist', async () => {
    expect(
      (
        await templateResolver(
          templateParams({ cwd: fixture('app'), templates: '2' }),
        )
      ).templates[0].path,
    ).toEqual(fixture('/app/_templates'))
  })

  it('take templates from HYGEN_TMPLS env when it exists', async () => {
    process.env.HYGEN_TMPLS = fixture('app-custom/other-templates')
    expect(
      (
        await templateResolver(
          templateParams({
            cwd: fixture('app-custom'),
            templates: '2',
          }),
        )
      ).templates[0].path,
    ).toEqual(fixture('app-custom/other-templates'))
    process.env.HYGEN_TMPLS = undefined
  })
})
