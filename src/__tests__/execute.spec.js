const execute = require('../execute')
const ftest = require('../test/ftest')
const fs = require('fs-extra')
const chalk = require('chalk')

const yes = () => Promise.resolve({ overwrite: true })
const no = () => Promise.resolve({ overwrite: false })
const fail = () => {
  throw new Error('set up prompt in testing')
}

jest.mock('inquirer', () => ({
  prompt: null
}))

const inquirer = require('inquirer')

describe('execute', () => {
  beforeEach(() => {
    inquirer.prompt = fail
  })
  ftest(
    'works',
    {
      app: {}
    },
    async () => {
      await execute(
        [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }],
        {},
        { cwd: 'app', logger: { log: _ => _ } }
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
    async () => {
      inquirer.prompt = no
      await execute(
        [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }],
        {},
        { cwd: 'app', logger: { log: _ => _ } }
      )

      expect(fs.readFileSync('app/workers/foobar.js').toString()).toEqual(
        'foobar'
      )
    }
  )

  ftest(
    'overwrite, prompt=y',
    {
      app: { workers: { 'foobar.js': 'foobar' } }
    },
    async () => {
      inquirer.prompt = yes
      await execute(
        [{ attributes: { to: 'workers/foobar.js' }, body: 'hello js!' }],
        {},
        { cwd: 'app', logger: { log: _ => _ } }
      )

      expect(fs.readFileSync('app/workers/foobar.js').toString()).toEqual(
        'hello js!'
      )
    }
  )

  ftest('with messages', {}, async () => {
    const logs = []
    await execute(
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
      {},
      { cwd: 'app', logger: { log: _ => logs.push(_) } }
    )
    expect(logs.join('\n')).toEqual(`${chalk.green(
      '       added: workers/boot.js'
    )}
${chalk.green('       added: workers/index.js')}
* hello from boot
* hello from index`)
  })

  ftest(
    'with messages (inject)',
    {
      app: {
        Gemfile: `source 'https://rubygems.org'
    gem 'rails'
    gem 'nokogiri'`
      }
    },
    async () => {
      const logs = []
      await execute(
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
        {},
        { cwd: 'app', logger: { log: _ => logs.push(_) } }
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
