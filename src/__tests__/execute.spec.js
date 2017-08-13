const execute = require('../execute')
const ftest = require('../test/ftest')
const fs = require('fs')

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
        { logger: console }
      )

      expect(
        fs.readFileSync('app/workers/foobar.js').toString()
      ).toMatchSnapshot()
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
        { logger: console }
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
        { logger: console }
      )
      expect(flagged).toBe(true)
    }
  )
})
