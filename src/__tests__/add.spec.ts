import add from '../ops/add'
import Logger from '../logger'

// const gemfile = `
//     source 'http://rubygems.org'
//     gem 'rails'
//     gem 'nokogiri'
//     gem 'httparty'
//     `

// TODO and inject is false
describe('add', () => {
  it('should return "skipped" if skip_if has value ', async () => {
    expect(
      await add(
        {
          attributes: {
            skip_if: 'true',
          },
          body: 'this should be skipped',
        },
        {},
        {
          logger: new Logger(console.log),
          debug: false,
          helpers: {},
          createPrompter: () => require('enquirer'),
        },
      ),
    ).toMatchSnapshot({ timing: expect.any(Number) })
  })
})
