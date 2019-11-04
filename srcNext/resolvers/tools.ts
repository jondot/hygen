import { HygenResolver, ReversePathWalkFn } from '../types'
import Logger from '../../src/logger'

export const createPrompter = () => require('enquirer')
// folders default is ['.hygen.js']
// if folders begins with '/' or '~', assume it is an absolute(ish) path
// if folder begins with anything else, it is assumed to be a filename
//   from current direct

// @param {[string]} [files=['.hygen.js']] an array of files to reverse dir search for
// @param {string} [files=[process.cwd()]from the directory to start searching from
// @param {string} [to=path.parse(process.cwd()).root] a directory to stop searching at
// @param {object} [path=require('path')] a pathlike object supporting path.resolve & path.sep
// @return {[string]} an array of files that may be a config file to load
export const reversePathsToWalk: ReversePathWalkFn = ({ files, path, from, to }) => {
  const start = path.resolve(from || process.cwd())
  const stop = path.resolve(to || path.parse(start)).root

  return files.reduce((all, file) => {
    // if file starts with ['/','~','../','./']
    if (file.match(/^(\.{1,2}\/|[/~])/)) {
      all.push(path.resolve(file))
      return all
    }
    // file is a name to search directories for
    start
      .split(path.sep)
      .forEach((_, idx, arr) => {
        const filePath = arr.slice(0, idx + 1).join(path.sep) || '/'
        // {start: '/home/pstibbons/code/concerning/hex',stop: '/home/pstibbons'}
        // filePath = '/home/pstibbons/code'; stop.startsWith(filePath) === false
        // filePath = '/home/pstibbons'; stop.startsWith(filePath) === true
        if (stop.startsWith(filePath)) return all

        all.push(path.join(filePath, file))
      })
    return all

  }, []).reverse()
}

export const resolveTools: HygenResolver = config => {
  config.tools = {
    prompter: createPrompter,
    logger: new Logger(config.io.consoleWrite),
    reversePathsToWalk,
    ...(config.tools || {}),
  }
  return Promise.resolve(config)
}
