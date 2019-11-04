import { HygenBuildConfig } from '../../types'

export const fetchConfigFiles = (config: HygenBuildConfig): Promise<Array<HygenBuildConfig>> => {
  const {io, env, tools} = config
  return Promise.resolve(
    tools.reversePathsToWalk({
      files: env.configFile,
      from: env.cwd,
      path: io.path,
    }))
    .then(files => files.reduce((promises: Array<Promise<HygenBuildConfig>>, file: string): Array<Promise<HygenBuildConfig>> => {
          io.exists(file).then(flag => {
            if (!flag) return promises
            promises.push(io.load(file).then(module => module as HygenBuildConfig))
          })
            .catch(err => {
              console.log(`configFile Loading ${file}: ${err}`)
              throw new Error(err)
            })
          return promises
        }, [] as Array<Promise<HygenBuildConfig>>)
    )
    .then(promises => Promise.all(promises))

}
