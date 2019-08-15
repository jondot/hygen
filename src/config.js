// @flow
import type { ResolverIO } from './types'
import importedPath from 'path'
import L from 'lodash'
// inline fp methods due to perf
const reduce = (f, init) => arr => arr.reduce(f, init)

const reversePathsToWalk = ({ folder, path }) => {
  const resolved = path.resolve(folder)
  const parts = resolved.split(path.sep)
  const results = parts.map(
    (n, idx, arr) => arr.slice(0, idx + 1).join(path.sep),
  )
  results[0] = results[0] || '/'
  return results.reverse()
}

const configLookup = (file: string, folder: string, path: any = importedPath) =>
  reversePathsToWalk({ folder, path }).map(p => path.join(p, file))

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

export { configLookup, ConfigResolver, reversePathsToWalk }
