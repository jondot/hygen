import { metaverse } from './metaverse-utils'
const enquirer = require('enquirer')

const failPrompt = () => {
  throw new Error('set up prompt in testing')
}

describe('metaverse', () => {
  beforeEach(() => {
    enquirer.prompt = failPrompt
  })
  // metaverse('hygen-defaults', [['use-defaults']], { overwrite: true })
  // metaverse('hygen-extension', [['hygen-js', 'new']], { overwrite: true })

  metaverse(
    'hygen-templates',
    [
      ['init', 'self'],
      // ['overwrite-yes', 'base'],
      // ['overwrite-yes', 'over'],
      // ['overwrite-no', 'base'],
      // ['overwrite-no', 'over', { overwrite: false }],
      // ['mailer', 'new'],
      // ['worker', 'new', '--name', 'foo'],
      // ['inflection', 'new', '--name', 'person'],
      // ['inflection-in-params', 'new', '--name', 'person'],
      // ['inflection-in-prompt', 'new'],
      // ['conditional-rendering', 'new', '--notGiven'],
      // ['add-unless-exists', 'new', '--message', 'foo'],
      // [
      //   'cli-prefill-prompt-vars',
      //   'new',
      //   '--message-from-cli',
      //   'hello-from-cli',
      // ],
      // ['cli-prefill-prompt-vars', 'name-is-special', 'foobar'],
      // [
      //   'cli-prefill-prompt-vars',
      //   'falsy-values-are-ok',
      //   'foobar',
      //   '--include_something',
      //   'false',
      // ],
      // ['recursive-prompt', 'new'],
      // ['positional-name', 'new', 'acmecorp'],
      // ['attrs-in-body', 'new'],
      // ['existing-params', 'new', '--email', 'premade-email@foobar.com'],
      // [
      //   'existing-params',
      //   'new-params-alias',
      //   '--email',
      //   'premade-email@foobar.com',
      // ],
      // [
      //   'index-js-existing-params',
      //   'new',
      //   '--email',
      //   'premade-email@foobar.com',
      // ],
      // [
      //   'index-js-existing-params',
      //   'new-params-alias',
      //   '--email',
      //   'premade-email@foobar.com',
      // ],
      // ['setup-new-project', 'new', 'jondot/hygen-template-e2e'],
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

export { metaverse }
