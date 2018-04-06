// @flow
import type { ResolverIO } from './types'
import importedPath from 'path'

import L from 'lodash'
// inline fp methods due to perf
const reduce = (f, init) => arr => L.reduce(arr, f, init)

const reversePathsToWalk = L.flow(
  ({ folder, path }) => ({ resolved: path.resolve(folder), path }),
  ({ resolved, path }) => ({ parts: resolved.split(path.sep), path }),
  ({ parts, path }) => {
    return reduce((acc, p) => [...acc, path.join(L.last(acc), p)], [
      path.join(L.head(parts), path.sep)
    ])(L.tail(parts))
  },
  L.reverse,
  L.uniq
)

const configLookup = (file: string, folder: string, path: any = importedPath) =>
  L.map(reversePathsToWalk({ folder, path }), p => path.join(p, file))

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
