// @flow
import type { ResolverIO } from './types'
import importedPath from 'path'

const reduce = (f, init) => arr => arr.reduce(f, init)
const uniq = arr => arr.filter((elem, pos) => arr.indexOf(elem) === pos)
const map = f => arr => arr.map(f)

const reversePathsToWalk = ({ folder, path }) => {
  const resolved = path.resolve(folder)
  const parts = resolved.split(path.sep)

  const all = reduce((acc, p) => [...acc, path.join(acc.slice(-1)[0], p)], [
    path.join(parts[0], path.sep),
  ])(parts.slice(1)).reverse()
  return uniq(all)
}

const configLookup = (file: string, folder: string, path: any = importedPath) =>
  map(p => path.join(p, file))(reversePathsToWalk({folder, path}))

class ConfigResolver {
  configFile: string
  io: ResolverIO
  constructor(configFile: string, io: ResolverIO) {
    this.configFile = configFile
    this.io = io
  }
  async resolve(from: string) {
    const configCandidates = configLookup(this.configFile, from)
    const { exists, load, none } = this.io
    for (const candidate of configCandidates) {
      if (await exists(candidate)) {
        return await load(candidate)
      }
    }
    return await none(from)
  }
}

export { configLookup, ConfigResolver }
