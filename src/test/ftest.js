const mock = require('mock-fs')

const ftest = (msg, files, test) => {
  it(msg, () => {
    try {
      mock(files)
      test()
    } finally {
      mock.restore()
    }
  })
}

module.exports = ftest
