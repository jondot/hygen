const mock = require('mock-fs')

const ftest = (msg, files, test) => {
  it(msg, async () => {
    try {
      mock(files)
      await test()
    } finally {
      mock.restore()
    }
  })
}

module.exports = ftest
