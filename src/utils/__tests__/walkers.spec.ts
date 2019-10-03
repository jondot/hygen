import { walkDirUp } from '../walkers'
import path from 'path'

describe("walkDirUp(from, to = '/')", () => {
  it('should be a function', () => {
    expect(typeof walkDirUp).toEqual('function')
  })

  it('should return an array of path', () => {
    const dir = '/home/rincewind/code/project'
    const result = walkDirUp({ startAt: dir })
    expect(Array.isArray(result)).toBeTruthy()
  })

  it('should return only the startAt path if stopAt is false', () => {
    const dir = '/home/rincewind/code/project'
    const result = walkDirUp({ startAt: dir })
    expect(result)
  })
  it('should return only the startAt path if stopAt is startAt', () => {
    const dir = '/home/rincewind/code/project'
    const result = walkDirUp({ startAt: dir, stopAt: dir })
    expect(result.length).toEqual(1)
    expect(result).toEqual([dir])
  })
  describe("for process.platform !== 'win32'", () => {
    it('should return every path from itself to root', () => {
      const dir = '/home/rincewind/code/project'
      const result = walkDirUp({ startAt: dir })

      expect(result.length).toEqual(5)
      expect(result[1]).toEqual('/home/rincewind/code')
    })
    it('should not include paths that start with stopAt', () => {
      const projectDir = '/home/rincewind/code/project'
      const dir = projectDir + '/_templates/generator/action'

      const result = walkDirUp({ startAt: dir, stopAt: projectDir })

      expect(result.length).toEqual(4)
      expect(result[2]).toEqual('/home/rincewind/code/project/_templates')
    })
    it('should add a filename if withFile is passed', () => {
      const dir = '/home/rincewind/code/project'
      const result = walkDirUp({
        startAt: dir,
        stopAt: dir,
        withFile: '.hygen.js',
      })
      expect(result.length).toEqual(1)
      expect(result[0]).toEqual('/home/rincewind/code/project/.hygen.js')
    })
  })

  describe('process.platform = win32', () => {
    it('looks up windows folders', () => {
      const result = walkDirUp({
        withFile: '.myconfig',
        startAt: 'C:\\foo\\bar\\baz',
        path: path.win32,
      })

      expect(Array.isArray(result)).toBeTruthy()
      expect(result.length).toEqual(4)
      expect(result[1]).toEqual('C:\\foo\\bar\\.myconfig')
      expect(result[2]).toEqual('C:\\foo\\.myconfig')
    })
  })
})
