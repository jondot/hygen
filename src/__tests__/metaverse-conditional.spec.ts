import { metaverse } from './metaverse-utils'

jest.mock('enquirer', () => ({
  prompt: null,
}))

const enquirer = require('enquirer')

const failPrompt = () => {
  throw new Error('set up prompt in testing')
}

describe('metaverse-conditional', () => {
  beforeEach(() => {
    enquirer.prompt = failPrompt
  })

  metaverse('hygen-templates-unix', [['shell', 'new', '--name', 'foo']], {
    overwrite: true,
  })
})
