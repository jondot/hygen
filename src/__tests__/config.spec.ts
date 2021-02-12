import path from 'path'
import { configLookup, ConfigResolver, reversePathsToWalk } from '../config'

const { sep } = path
describe(`config lookup with separator '${sep}'`, () => {
  if (process.platform !== 'win32') {
    it('sanitizes bad "from" path', () => {
      const p = configLookup('.myconfig', 'foo').find((f) =>
        f.match(/foo\/\.myconfig/),
      )
      expect(p).toBeDefined()
    })

    it('looks up configuration upwards', () => {
      expect(configLookup('.myconfig', '/')).toEqual(['/.myconfig'])
      expect(configLookup('.myconfig', '/one')).toEqual([
        '/one/.myconfig',
        '/.myconfig',
      ])
      expect(configLookup('.myconfig', '/one/one/one')).toEqual([
        '/one/one/one/.myconfig',
        '/one/one/.myconfig',
        '/one/.myconfig',
        '/.myconfig',
      ])
      expect(configLookup('.myconfig', '/users/foo/bar/baz')).toEqual([
        '/users/foo/bar/baz/.myconfig',
        '/users/foo/bar/.myconfig',
        '/users/foo/.myconfig',
        '/users/.myconfig',
        '/.myconfig',
      ])
    })
  }
  it('looks up windows folders', () => {
    expect(configLookup('.myconfig', 'C:\\foo\\bar\\baz', path.win32)).toEqual([
      'C:\\foo\\bar\\baz\\.myconfig',
      'C:\\foo\\bar\\.myconfig',
      'C:\\foo\\.myconfig',
      'C:\\.myconfig',
    ])
    expect(configLookup('.myconfig', 'C:\\', path.win32)).toEqual([
      'C:\\.myconfig',
    ])
  })
})

describe('resolver', () => {
  it('resolves closest file', async () => {
    const exists = jest.fn()
    exists.mockReturnValue(Promise.resolve(true))

    const load = jest.fn()
    load.mockReturnValue(Promise.resolve({ param: 1 }))

    const resolver = new ConfigResolver('.hygen.js', {
      none: (_) => ({}),
      exists,
      load,
    })
    const config = await resolver.resolve('/foo/bar')

    expect(config).toEqual({ param: 1 })
  })

  it('resolves a file in the walk path', async () => {
    const exists = jest.fn((f) => Promise.resolve(f === '/foo/.hygen.js'))

    const load = jest.fn()
    load.mockReturnValue(Promise.resolve({ param: 1 }))

    const resolver = new ConfigResolver('.hygen.js', {
      none: (_) => ({}),
      exists,
      load,
    })
    const config = await resolver.resolve('/foo/bar')

    expect(config).toEqual({ param: 1 })
  })
})

describe('reversePathsToWalk({folder, path})', () => {
  it('should return an array of paths', () => {
    const folder = '/where/the/code/lives'
    const result = reversePathsToWalk({ folder, path })
    expect(result.length).toEqual(5)
    expect(result[2]).toEqual('/where/the')
  })
})
