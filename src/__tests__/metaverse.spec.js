jest.mock('inquirer', () => ({
  prompt: null
}))
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
    if (promptResponse) {
      inquirer.prompt = () => Promise.resolve(promptResponse)
    }
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
    await fs.remove(path.join(metaDir, 'given'))
    console.log('before', fs.readdirSync(metaDir))
    for (const cmd of cmds) {
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
  metaverse(
    'hygen-templates',
    [
      ['init', 'self'],
      ['mailer', 'new'],
      ['worker', 'new', '--name', 'foo'],
      ['shell', 'new', '--name', 'foo'],
      ['inflection', 'new', '--name', 'person'],
      ['conditional-rendering', 'new', '--notGiven'],
      ['add-unless-exists', 'new', '--message', 'foo'],
      ['recursive-prompt', 'new']
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
