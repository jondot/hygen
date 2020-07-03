import Logger from '../logger'

jest.mock('enquirer', () => ({
  prompt: null,
}))

const SKIP_ON_WINDOWS = process.platform === 'win32' ? ['shell'] : []

const path = require('path')
const dirCompare = require('dir-compare')

const opts = { compareContent: true }
const fs = require('fs-extra')
const enquirer = require('enquirer')
const { runner } = require('../index')

const logger = new Logger(console.log)
const failPrompt = () => {
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
        return require('execa').command(action, { ...opts, shell: true })
      },
      logger,
      createPrompter: () => require('enquirer'),
    }
    // await fs.remove(path.join(metaDir, 'given'))
    console.log('before', fs.readdirSync(metaDir))
    for (let cmd of cmds) {
      console.log('testing', cmd)
      if (
        process.platform === 'win32' &&
        SKIP_ON_WINDOWS.find(c => cmd[0] === c)
      ) {
        console.log(`skipping ${cmd} (windows!)`)
        await fs.remove(path.join(metaDir, 'expected', cmd[0]))
        continue
      }

      enquirer.prompt = failPrompt
      if (promptResponse) {
        const last = cmd[cmd.length - 1]
        if (typeof last === 'object') {
          cmd = cmd.slice(cmd.length - 1)
          enquirer.prompt = () =>
            Promise.resolve({ ...promptResponse, ...last })
        } else {
          enquirer.prompt = () => Promise.resolve(promptResponse)
        }
      }
      const res = await runner(cmd, config)
      res.actions.forEach(a => {
        a.timing = -1
        a.subject = a.subject.replace(/.*hygen\/src/, '')
      })
      expect(res).toMatchSnapshot(cmd.join(' '))
    }
    const givenDir = path.join(metaDir, 'given')
    const expectedDir = path.join(metaDir, 'expected')
    console.log('after', {
      [givenDir]: fs.readdirSync(givenDir),
      [expectedDir]: fs.readdirSync(expectedDir),
    })
    const res = dirCompare.compareSync(givenDir, expectedDir, opts)
    res.diffSet = res.diffSet.filter(d => d.state !== 'equal')
    if (!res.same) {
      console.log(res)
    }
    expect(res.same).toEqual(true)
  })

describe('metaverse', () => {
  beforeEach(() => {
    enquirer.prompt = failPrompt
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
      [
        'cli-prefill-prompt-vars',
        'new',
        '--message-from-cli',
        'hello-from-cli',
      ],
      ['cli-prefill-prompt-vars', 'name-is-special', 'foobar'],
      [
        'cli-prefill-prompt-vars',
        'falsy-values-are-ok',
        'foobar',
        '--include_something',
        'false',
      ],
      ['recursive-prompt', 'new'],
      ['positional-name', 'new', 'acmecorp'],
      ['attrs-in-body', 'new'],
      ['existing-params', 'new', '--email', 'premade-email@foobar.com'],
      [
        'existing-params',
        'new-params-alias',
        '--email',
        'premade-email@foobar.com',
      ],
      [
        'index-js-existing-params',
        'new',
        '--email',
        'premade-email@foobar.com',
      ],
      [
        'index-js-existing-params',
        'new-params-alias',
        '--email',
        'premade-email@foobar.com',
      ],
    ], // this is all of the responses enquirer gives out from _all_ tests, ever.
    // it's best to just keep it that way to be simple, and each prompt-dealing test
    // has its own set of uniquely named variables.
    {
      // generic for all tests
      name: 'message',
      message: 'foo',
      overwrite: true,

      // recursive-prompt
      email: 'some-email@foobar.com',
      emailConfirmation: 'confirmed-some-email@foobar.com',
    },
  )
})
