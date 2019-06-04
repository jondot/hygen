import createResult from '../ops/result'

describe('createResult(type, subject, start = new Date())', () => {
  it('should be a function', () => {
    expect(typeof createResult).toBe('function')
  })
  it('should return a function', () => {
    const r = createResult('woot', 'prime')
    expect(typeof r).toBe('function')
  })
  describe('resultFunction(status, payload = null, end = new Date()', () => {
    it('should return an object', () => {
      const r = createResult('woot', 'prime')
      const result = r('shiny', 'lovely')

      expect(result).toHaveProperty('type', 'woot')
      expect(result).toHaveProperty('subject', 'prime')
      expect(result).toHaveProperty('status', 'shiny')
      expect(result).toHaveProperty('payload', 'lovely')
    })
  })
})
