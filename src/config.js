// @flow
import type { ResolverIO } from './types'

import path from 'path'
import L from 'lodash'
// inline fp methods due to perf
const reduce = (f, init) => arr => L.reduce(arr, f, init)

const reversePathsToWalk = L.flow(
  f => path.resolve(f),
  f => f.split(path.sep),
  reduce(
    (acc, p) =>
      p === undefined || p === ''
        ? [path.sep]
        : [...acc, path.join(L.last(acc), p)],
    []
  ),
  L.reverse
)

const configLookup = (file: string, folder: string) =>
  L.map(reversePathsToWalk(folder), p => path.join(p, file))

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
