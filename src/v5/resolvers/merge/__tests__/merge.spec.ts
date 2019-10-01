import mergeHygenConfig from '../merge'

describe('mergeHygenConfig', () => {
  describe('Basics', () => {
    it('should be a function', () => {
      expect(typeof mergeHygenConfig).toEqual('function')
    })
    // does it accept all of the various parameter signatures it needs
    // does it return the correct data
  })

  describe('mergeHygenConfig(stale: HygenConfig, fresh: HygenConfig): HygenConfig', () => {
    it('should merge two object', () => {
      let stale = {a: 1}
      let fresh = {b: 2}
      const result = mergeHygenConfig(stale, fresh)
      expect(result).toEqual({a: 1, b: 2})
    })
  })

  describe('Errors', () => {
    it('should test errors by causing them', () => {
      const hasRealTests = false
      expect(hasRealTests).toBeTruthy()
    })
  })
})
