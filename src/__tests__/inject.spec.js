const inject = require('../inject')
const gemfile = `
    source 'http://rubygems.org'
    gem 'rails'
    gem 'nokogiri'
    gem 'httparty'

    `
describe('inject', () => {
  it('before', () => {
    expect(
      inject(
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
  it('after', () => {
    expect(
      inject(
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
  it('prepend', () => {
    expect(
      inject(
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
  it('append', () => {
    expect(
      inject(
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
  it('at_index', () => {
    expect(
      inject(
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
  it('skip_if', () => {
    expect(
      inject(
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
