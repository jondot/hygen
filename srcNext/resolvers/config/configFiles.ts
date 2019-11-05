import { HygenBuildConfig } from '../../types'

export const fetchConfigFiles = (config: HygenBuildConfig): Promise<Array<HygenBuildConfig>> => {
  const { io, env, tools } = config

  return Promise.resolve(
    tools.reversePathsToWalk({
      files: env.configFile,
      from: env.cwd,
      path: io.path,
    }))
    .catch(err => {
      throw new Error(err)
    })
    .then((files: Array<string>): Promise<Array<string>> =>
      Promise.all(files.map(
        (file: string): Promise<string> =>
          io.exists(file).then((flag: boolean): string => flag ? file : ''),
        ),
      ).then((files: Array<string>): Array<string> => files.filter(f => f.length > 0)),
    )
    .then((files: Array<string>): Promise<Array<HygenBuildConfig>> =>
      Promise.all(files.map(
        (file: string): Promise<HygenBuildConfig> => {
          tools.logger.notice(`Loading ${file}`)
          return io.load(file)
            .catch(err => {
              tools.logger.err(`Config file loading Error: ${file}`)
              throw err
            })
        }
      )))
}
