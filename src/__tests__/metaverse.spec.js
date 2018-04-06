jest.mock('inquirer', () => ({
  prompt: null
}))

const SKIP_ON_WINDOWS = process.platform === 'win32' ? ['shell'] : []

const L = require('lodash')
const { runner } = require('../index')
const path = require('path')
const dirCompare = require('dir-compare')
const opts = { compareContent: true }
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Logger = require('../logger')
const logger = new Logger(console.log)
const fail = () => {
  throw new Error('set up prompt in testing')
}

const dir = m => path.join(__dirname, 'metaverse', m)
const metaverse = (folder, cmds, promptResponse = null) =>
  it(folder, async () => {
    const metaDir = dir(folder)
    console.log('metaverse test in:', metaDir)
    const config = {
      templates: '_templates',
      cwd: metaDir,
      exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {}
        return require('execa').shell(action, opts)
      },
      logger
    }
    // await fs.remove(path.join(metaDir, 'given'))
    console.log('before', fs.readdirSync(metaDir))
    for (let cmd of cmds) {
      console.log('testing', cmd)
      if (
        process.platform === 'win32' &&
        L.find(SKIP_ON_WINDOWS, c => L.head(cmd) === c)
      ) {
        console.log(`skipping ${cmd} (windows!)`)
        await fs.remove(path.join(metaDir, 'expected', L.head(cmd)))
        continue
      }

      inquirer.prompt = fail
      if (promptResponse) {
        const last = L.last(cmd)
        if (L.isObject(last)) {
          cmd = L.take(cmd, cmd.length - 1)
          inquirer.prompt = () =>
            Promise.resolve({ ...promptResponse, ...last })
        } else {
          inquirer.prompt = () => Promise.resolve(promptResponse)
        }
      }
      await runner(cmd, config)
    }
    const givenDir = path.join(metaDir, 'given')
    const expectedDir = path.join(metaDir, 'expected')
    console.log('after', {
      [givenDir]: fs.readdirSync(givenDir),
      [expectedDir]: fs.readdirSync(expectedDir)
    })
    const res = dirCompare.compareSync(givenDir, expectedDir, opts)
    res.diffSet = L.filter(res.diffSet, d => d.state !== 'equal')
    if (!res.same) {
      console.log(res)
    }
    expect(res.same).toEqual(true)
  })

describe('metaverse', () => {
  beforeEach(() => {
    inquirer.prompt = fail
  })
  metaverse('hygen-extension', [['hygen-js', 'new']], { overwrite: true })
  metaverse(
    'hygen-templates',
    [
      ['init', 'self'],
      ['overwrite-yes', 'base'],
      ['overwrite-yes', 'over'],
      ['overwrite-no', 'base'],
      ['overwrite-no', 'over', { overwrite: false }],
      ['mailer', 'new'],
      ['worker', 'new', '--name', 'foo'],
      ['shell', 'new', '--name', 'foo'],
      ['inflection', 'new', '--name', 'person'],
      ['conditional-rendering', 'new', '--notGiven'],
      ['add-unless-exists', 'new', '--message', 'foo'],
      ['recursive-prompt', 'new'],
      ['existing-params', 'new', '--email', 'premade-email@foobar.com'],
      [
        'existing-params',
        'new-params-alias',
        '--email',
        'premade-email@foobar.com'
      ],
      [
        'index-js-existing-params',
        'new',
        '--email',
        'premade-email@foobar.com'
      ],
      [
        'index-js-existing-params',
        'new-params-alias',
        '--email',
        'premade-email@foobar.com'
      ]
    ],
    // this is all of the responses inquirer gives out from _all_ tests, ever.
    // it's best to just keep it that way to be simple, and each prompt-dealing test
    // has its own set of uniquely named variables.
    {
      // generic for all tests
      name: 'message',
      message: 'foo',
      overwrite: true,

      // recursive-prompt
      email: 'some-email@foobar.com',
      confirmationEmail: 'confirmed-some-email@foobar.com'
    }
  )
})
