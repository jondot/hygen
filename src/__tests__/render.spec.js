const render = require('../render')
const path = require('path')
const ftest = require('../test/ftest')
const fs = require('fs')
const fixture = name =>
  fs.readFileSync(path.join(__dirname, './fixtures', name)).toString()

describe('render', () => {
  ftest(
    'empty',
    { app: { action: { 'empty.ejs.t': fixture('empty.ejs.t') } } },
    () => {
      const res = render({})('app/action')
      expect(res[0].file).toMatch(/empty/)
      res[0].file = 'empty.ejs.t'
      expect(res[0].body).toEqual('')
    }
  )
  ftest(
    'full',
    { app: { action: { 'full.ejs.t': fixture('full.ejs.t') } } },
    () => {
      const res = render({ bill: 17, name: 'someone' })('app/action')
      expect(res[0].file).toMatch(/full/)
      res[0].file = 'full.ejs.t'
      expect(res[0].body).toMatch(
        'Find me at <i>app/mailers/hello/html.ejs</i>'
      )
    }
  )

  ftest(
    'capitalized',
    { app: { action: { 'capitalized.ejs.t': fixture('capitalized.ejs.t') } } },
    () => {
      const res = render({ name: 'someone' })('app/action')
      expect(res[0].file).toMatch(/capitalized/)
      res[0].file = 'capitalize.ejs.t'
      expect(res[0].body).toMatch(/someone and Someone/)
    }
  )

  ftest(
    'capitalized with default locals',
    { app: { action: { 'capitalized.ejs.t': fixture('capitalized.ejs.t') } } },
    () => {
      const res = render({})('app/action')
      expect(res[0].file).toMatch(/capitalized/)
      res[0].file = 'capitalize.ejs.t'
      expect(res[0].body).toMatch(/unnamed and Unnamed/)
    }
  )
})
