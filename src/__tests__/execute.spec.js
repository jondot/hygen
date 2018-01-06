const execute = require('../execute')
const ftest = require('../test/ftest')
const fs = require('fs-extra')
const chalk = require('chalk')

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

  ftest('with messages', {}, () => {
    const logs = []
    execute(
      'app',
      [
        {
          attributes: {
            to: 'workers/boot.js',
            message: 'hello from boot'
          },
          body: 'hello boot!'
        },
        {
          attributes: {
            to: 'workers/index.js',
            message: 'hello from index'
          },
          body: 'hello index!'
        }
      ],
      () => {},
      {},
      { logger: { log: _ => logs.push(_) } }
    )
    expect(logs.join('\n')).toEqual(`${chalk.green(
      '       added: workers/boot.js'
    )}
${chalk.green('       added: workers/index.js')}
* hello from boot
* hello from index`)
  })

  ftest(
    'with messages',
    {
      app: {
        Gemfile: `source 'https://rubygems.org'
    gem 'rails'
    gem 'nokogiri'`
      }
    },
    () => {
      const logs = []
      execute(
        'app',
        [
          {
            attributes: {
              to: 'Gemfile',
              inject: true,
              after: "gem 'rails'"
            },
            body: "    gem 'devise'"
          }
        ],
        () => {},
        {},
        { logger: { log: _ => logs.push(_) } }
      )
      expect(fs.readFileSync('app/Gemfile').toString())
        .toEqual(`source 'https://rubygems.org'
    gem 'rails'
    gem 'devise'
    gem 'nokogiri'`)
      expect(logs.join('\n')).toEqual(
        `${chalk.magenta('      inject: Gemfile')}`
      )
    }
  )
})
