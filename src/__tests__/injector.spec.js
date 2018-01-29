const injector = require('../ops/injector')
const gemfile = `
    source 'http://rubygems.org'
    gem 'rails'
    gem 'nokogiri'
    gem 'httparty'

    `
describe('injector', () => {
  it('before rails', () => {
    expect(
      injector(
        {
          attributes: {
            before: "gem 'rails'"
          },
          body: "    gem 'kamikaze' # added by hygen"
        },
        gemfile
      )
    ).toMatchSnapshot()
  })
  it('after rails', () => {
    expect(
      injector(
        {
          attributes: {
            after: "gem 'rails'"
          },
          body: "    gem 'kamikaze' # added by hygen"
        },
        gemfile
      )
    ).toMatchSnapshot()
  })
  it('prepend top of file', () => {
    expect(
      injector(
        {
          attributes: {
            prepend: true
          },
          body: "    gem 'kamikaze' # added by hygen"
        },
        gemfile
      )
    ).toMatchSnapshot()
  })
  it('append bottom of file', () => {
    expect(
      injector(
        {
          attributes: {
            append: true
          },
          body: "    gem 'kamikaze' # added by hygen"
        },
        gemfile
      )
    ).toMatchSnapshot()
  })
  it('at_index 2 (below "source")', () => {
    expect(
      injector(
        {
          attributes: {
            at_line: 2
          },
          body: "    gem 'kamikaze' # added by hygen"
        },
        gemfile
      )
    ).toMatchSnapshot()
  })
  it('skip_if "source" exists', () => {
    expect(
      injector(
        {
          attributes: {
            skip_if: 'source',
            after: "gem 'rails'"
          },
          body: "    gem 'kamikaze' # added by hygen"
        },
        gemfile
      )
    ).toMatchSnapshot()
  })
})
