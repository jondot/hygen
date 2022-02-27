import importedPath from 'path'
import type { ResolverIO } from './types'

// inline fp methods due to perf
const uniq = (arr) => arr.filter((elem, pos, a) => a.indexOf(elem) === pos)
const reversePathsToWalk = ({ folder, path }) => {
  const resolved = path.resolve(folder)
  const parts = resolved.split(path.sep)
  const results = parts.map((_, idx, arr) =>
    arr.slice(0, idx + 1).join(path.sep),
  )
  results[0] = results[0] || '/'
  return results.reverse()
}

const configLookup = (file: string, folder: string, path: any = importedPath) =>
  uniq(reversePathsToWalk({ folder, path }).map((p) => path.join(p, file)))

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
        return load(candidate)
      }
    }
    return none(from)
  }
}

export { configLookup, ConfigResolver, reversePathsToWalk }
