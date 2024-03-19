import Logger from '../logger'
import { runner } from '../index'
jest.setTimeout(60 * 1000)
jest.mock('enquirer', () => ({
  prompt: null,
}))

const path = require('path')
const dirCompare = require('dir-compare')

const opts = { compareContent: true }
const fs = require('fs-extra')
const enquirer = require('enquirer')

const logger = new Logger(console.log)
const failPrompt = () => {
  throw new Error('set up prompt in testing')
}

const normalize = (s) => s.replace(/\\/g, '/').replace(/.*hygen\/src/, '')

const createConfig = (metaDir) => ({
  templates: '_templates',
  cwd: metaDir,
  exec: (action, body) => {
    const execOpts = body && body.length > 0 ? { input: body } : {}
    return require('execa').command(action, { ...execOpts, shell: true })
  },
  logger,
  createPrompter: () => require('enquirer'),
})
const dir = (m) => path.join(__dirname, 'metaverse', m)

const metaverse = (folder, cmds, promptResponse: any = null) => {
  it(folder, async () => {
    const metaDir = dir(folder)
    console.log('metaverse test in:', metaDir)
    const config = createConfig(metaDir)
    console.log('before', fs.readdirSync(metaDir))

    for (let cmd of cmds) {
      if (process.env.TEST_FOCUS && process.env.TEST_FOCUS !== cmd[0]) {
        console.log('skipping(focus):', cmd)
        continue
      }
      console.log('testing', cmd)
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
      res.actions.forEach((a) => {
        a.timing = -1
        a.subject = normalize(a.subject)
        if (a.payload?.name) {
          a.payload.name = normalize(a.payload.name)
        }
        if (a.payload?.to) {
          a.payload.to = normalize(a.payload.to)
        }
      })
      expect(res).toMatchSnapshot(`${cmd.join(' ')}`)
    }
    if (!process.env.TEST_FOCUS) {
      const givenDir = path.join(metaDir, 'given')
      const expectedDir = path.join(metaDir, 'expected')
      console.log('after', {
        [givenDir]: fs.readdirSync(givenDir),
        [expectedDir]: fs.readdirSync(expectedDir),
      })
      const res = dirCompare.compareSync(givenDir, expectedDir, opts)
      res.diffSet = res.diffSet.filter((d) => d.state !== 'equal')
      if (!res.same) {
        console.log(res)
      }
      expect(res.same).toEqual(true)
    }
  })
}

export { metaverse }
