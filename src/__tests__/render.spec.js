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
      console.log(res[0].file)
      expect(res[0].file).toMatch(/empty/)
      res[0].file = 'empty.ejs.t'
      expect(res).toMatchSnapshot()
    }
  )
  ftest(
    'full',
    { app: { action: { 'full.ejs.t': fixture('full.ejs.t') } } },
    () => {
      const res = render({ bill: 17, name: 'someone' })('app/action')
      console.log(res[0].file)
      expect(res[0].file).toMatch(/full/)
      res[0].file = 'full.ejs.t'
      expect(res).toMatchSnapshot()
    }
  )
})
