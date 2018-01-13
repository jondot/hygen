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
      logger: console
    }
    await fs.remove(path.join(metaDir, 'given'))
    console.log('before', fs.readdirSync(metaDir))
    for (const cmd of cmds) {
      await runner(cmd, config)
    }
    console.log('after', fs.readdirSync(metaDir))
    const res = dirCompare.compareSync(
      path.join(metaDir, 'given'),
      path.join(metaDir, 'expected'),
      opts
    )
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
    [['init', 'self'], ['mailer', 'new'], ['worker', 'new', '--name', 'foo']],
    { name: 'message', message: 'foo' }
  )
})
