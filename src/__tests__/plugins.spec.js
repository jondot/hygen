const opsPlugin = require('../ops/plugin')

const pluginData = ['woot', name => `wooticus ${name}`]
const fakeAction = { attributes: { woot: 'prime' } }
const fakeConfig = { logger: { ok: msg => console.log(msg) } }
describe('pluginData', () => {
  it('should execute', async () => {
    const result = await pluginData[1]('prime')

    expect(result).toBe('wooticus prime')
  })
})
describe('plugins', () => {
  beforeEach(() => {
    process.env.HYGEN_TMPLS = null
  })

  it('should return a function', () => {
    const result = opsPlugin(...pluginData)
    expect(typeof result).toBe('function')
  })

  describe('wrappedPlugin', () => {
    const wrappedPlugin = opsPlugin(...pluginData)

    it('should return a result object', async () => {
      const args = {}
      const result = await wrappedPlugin(fakeAction, args, fakeConfig)

      expect(result).toHaveProperty('type', 'plugin:woot')
      expect(result).toHaveProperty('payload', 'wooticus prime')
    })
    it('should add the name/plugin to args', async () => {
      const args = {}
      await wrappedPlugin(fakeAction, args, fakeConfig)

      expect(args).toHaveProperty('woot', 'wooticus prime')
    })
  })
})
