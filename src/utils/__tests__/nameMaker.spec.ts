import { nameMaker } from '../nameMaker'

describe("nameMaker({name: 'wooticusPrime'})", function() {
  it('should be a function', () => {
    expect(typeof nameMaker).toEqual('function')
  })
  it('should return an object with 6 properties', function() {
    const result = nameMaker({ name: 'wooticusPrime' })

    expect(typeof result).toEqual('object')

    expect(result.name).toBe('wooticusPrime')
    expect(result.Name).toBe('WooticusPrime')
    expect(result.names).toBe('wooticusPrimes')
    expect(result.Names).toBe('WooticusPrimes')
    expect(result.NAME).toBe('WOOTICUS_PRIME')
    expect(result.NAMES).toBe('WOOTICUS_PRIMES')
  })
  describe('new Proxy(nameMaker({wooticusPrime}, suffixer)', () => {
    it('should return a name matching prop used', () => {
      const result = nameMaker({ name: 'wooticusPrime' })

      expect(result.shape).toBe('wooticusPrimeShape')
      expect(result.Shape).toBe('WooticusPrimeShape')
      expect(result.SHAPE).toBe('WOOTICUS_PRIME_SHAPE')
    })
  })
})
