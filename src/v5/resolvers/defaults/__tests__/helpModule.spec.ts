import helpModuleResolver from '../helpModule'

describe('helpModuleResolver', () => {
  describe('Basics', () => {
    it('should be a function', () => {
      expect(typeof helpModuleResolver).toEqual('function')
    })
    // does it accept all of the various parameter signatures it needs
    // does it return the correct data
  })

  describe('helpModuleResolver(config: HygenConfig): HygenConfig', () => {
    // happy path
    it('should test happy path', () => {
      const hasRealTests = false
      expect(hasRealTests).toBeTruthy()
    })
  })

  describe('Errors', () => {
    it('should test errors by causing them', () => {
      const hasRealTests = false
      expect(hasRealTests).toBeTruthy()
    })
  })
})
