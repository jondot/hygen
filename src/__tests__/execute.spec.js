const execute = require('../execute')
const ftest = require('../test/ftest')
const fs = require('fs-extra')

describe('execute', () => {
  ftest(
    'works',
    {
      app: {}
    },
    () => {
      execute(
        'app',
        [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }],
        () => {
          throw new Error('prompt!')
        },
        {},
        { logger: { log: _ => _ } }
      )

      expect(fs.readFileSync('app/workers/foobar.js').toString()).toMatch(
        /hello js!/
      )
    }
  )

  ftest(
    'skips, prompt=n',
    {
      app: { workers: { 'foobar.js': 'foobar' } }
    },
    () => {
      execute(
        'app',
        [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }],
        () => {
          return 'n'
        },
        {},
        { logger: { log: _ => _ } }
      )
    }
  )

  ftest(
    'overwrite, prompt=y',
    {
      app: { workers: { 'foobar.js': 'foobar' } }
    },
    () => {
      let flagged = false
      execute(
        'app',
        [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }],
        () => {
          flagged = true
          return 'y'
        },
        {},
        { logger: { log: _ => _ } }
      )
      expect(flagged).toBe(true)
    }
  )
})
