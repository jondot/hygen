import hooksResolver from '../hooks'

describe('hooksResolver', () => {
  describe('Basics', () => {
    it('should be a function', () => {
      expect(typeof hooksResolver).toEqual('function')
    })
    // does it accept all of the various parameter signatures it needs
    // does it return the correct data
  })

  describe('hooksResolver(config: HygenConfig): HygenConfig', () => {
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
