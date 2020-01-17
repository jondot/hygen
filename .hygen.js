module.exports = {
  init: (config) => {
    config.args.pinder = 'stibbons'
    return Promise.resolve(config)
  },
  yargs: (yargs) => {
    yargs.option('srcDir',{
      alias: 'src',
      default: 'src',
      describe: 'project src directory'
    })
  },
  helpers: {
    srcPath: name => `Named: ${name}`,
  },
}