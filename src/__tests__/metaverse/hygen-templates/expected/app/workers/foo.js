const { Worker } = require('hyperwork')
const asyncwork = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000)
  })
}

class Foo extends Worker {
  async perform({ data }) {
    this.log('started work')
    await asyncwork()
    this.log('finished work')
  }
}

module.exports = Foo
