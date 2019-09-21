import {pathTo} from 'src/v5/utils/pathTo'

const pathToModule = {
  hooks: {
    postModule: [
      config => {
        config.helpers.pathTo =  pathTo(config.env.cwd)
        config.helpers.pathTo.pathUtil(config.env.path)
        config.helpers.projectPath = config.helpers.pathTo
        config.helpers.srcPath = config.helpers.pathTo.add('src')
        config.helpers.testPath = config.helpers.srcPath.add('__tests__')
        config.helpers.templatesPath = config.helpers.projectPath.add(config.env.templatedDir)

        return config
      }
    ]
  }

}

export default pathToModule
