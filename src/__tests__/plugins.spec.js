const resolvePlugins = require('../plugins')

const fakeConfig = {
  logger: { ok: msg => console.log(msg) },
  plugins: {
    woot: name => `wooticus ${name}`,
  },
}
const fakeDataArr = [{ attributes: { woot: 'prime' } }]
const fakeArgs = {}

describe('pluginData', () => {
  it('should execute', async () => {
    const result = await fakeConfig.plugins.woot('prime')
    expect(result).toBe('wooticus prime')
  })
})

describe('resolvePlugins(arrData, config, args)', () => {
  beforeEach(() => {
    process.env.HYGEN_TMPLS = null
  })

  it('should be a function', () => {
    expect(typeof resolvePlugins).toBe('function')
  })

  it('should return an array with same length as dataArr', () => {
    const result = resolvePlugins(fakeDataArr, {}, fakeArgs)

    expect(Array.isArray(result)).toBeTruthy()
    expect(result.length).toBe(fakeDataArr.length)
  })

  it('should execute the plugin and assign result ', async() => {
    const result = await resolvePlugins(fakeDataArr, fakeConfig, fakeArgs)
    const subject = result[0].pluginResults

    expect(subject.woot).toEqual('wooticus prime')
  })
})
