module.exports = {
  command: 'bob <action> [name]',
    describe: 'Generate bob templates',
  builder: y => {
  return y.positional('generator', {
    describe: 'generator to use',
    type: 'string',
    default: 'bob'
  })
    .positional('action', {
      describe: 'action to use',
      type: 'string',
    })
    .positional('name', {
      describe: 'name for the generated templates',
      type: 'string',
    })
},
  handler: yargv => console.log('bob handled')
}