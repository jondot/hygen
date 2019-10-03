import { PathTo } from '../utils/pathTo'
import { HygenConfig, HygenResolver } from '../hygen'

const assignPathToHelpers: HygenResolver = config => {
  PathTo.pathUtil = config.tools.io.path

  config.helpers.pathTo = PathTo(config.env.cwd)
  config.helpers.pathTo.pathUtil(config.env.path)
  config.helpers.projectPath = config.helpers.pathTo
  config.helpers.srcPath = config.helpers.pathTo.add('src')
  config.helpers.testPath = config.helpers.srcPath.add('__tests__')
  config.helpers.templatesPath = config.helpers.projectPath.add(
    config.env.templatedDir,
  )

  return Promise.resolve(config)
}

const pathToModule: HygenConfig = {
  hooks: {
    postModule: [assignPathToHelpers],
  },
}

export default pathToModule
