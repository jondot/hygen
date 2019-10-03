import mergeConfig from '../mergeConfig'

describe('mergeHygenConfig', () => {
  describe('Basics', () => {
    it('should be a function', () => {
      expect(typeof mergeConfig).toEqual('function')
    })
    // does it accept all of the various parameter signatures it needs
    // does it return the correct data
  })

  describe('mergeHygenConfig(stale: HygenConfig, fresh: HygenConfig): HygenConfig', () => {
    it('should merge two object', () => {
      let stale = { a: 1 }
      let fresh = { b: 2 }
      const result = mergeConfig(stale, fresh)
      expect(result).toEqual({ a: 1, b: 2 })
    })
    it('should replace fresh scalar values', () => {
      // let stale = { a: 42, b: 'bob', c: false, stale: true }
      // let fresh = { a: 'Carrot', b: false, c: 'p', fresh: true }
      let stale = { a: 42, b: 'Vimes', c: false, d: new Date() }
      let fresh = {
        a: 'Carrot',
        b: true,
        c: new Set([42, 42, 42]),
        d: 'Ironfounderson',
      }
      const result = mergeConfig(stale, fresh)
      expect(result).toEqual(fresh)
    })
    it('should append fresh arrays to stale', () => {
      let stale = { a: [], b: [42], c: ['Vimes'] }
      let fresh = { a: ['King'], b: [], c: ['Carrot'] }
      const result = mergeConfig(stale, fresh)
      expect(result).toEqual({ a: ['King'], b: [42], c: ['Vimes', 'Carrot'] })
    })
    it('should run a fresh function on old data and use result', () => {
      let stale = { a: 42 }
      let fresh = { a: orig => orig / 14 }
      const result = mergeConfig(stale, fresh)
      expect(result).toEqual({ a: 3 })
    })
    it('should also merge the second generation of object values', () => {
      let stale = { a: { b: 17, c: 1, e: [1, 1, 2] } }
      let fresh = { a: { b: 52, d: 17, e: [3, 5, 8] } }
      const result = mergeConfig(stale, fresh)
      expect(result).toEqual({
        a: { b: 52, c: 1, d: 17, e: [1, 1, 2, 3, 5, 8] },
      })
    })
    it('should send a trace and debug message', () => {
      const stale = {
        logger: {
          trace: jest.fn(msg => msg),
          debug: jest.fn(msg => msg),
        },
      }
      const fresh = {
        carrot: 'Captain',
      }
      const result = mergeConfig(stale, fresh)
      expect(stale.logger.trace.mock.calls.length).toEqual(1)
      expect(stale.logger.debug.mock.calls.length).toEqual(1)
    })
  })

  xdescribe('Errors', () => {
    it('should test errors by causing them', () => {
      const hasRealTests = false
      expect(hasRealTests).toBeTruthy()
    })
  })
})
