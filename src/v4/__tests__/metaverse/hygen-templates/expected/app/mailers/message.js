const { Mailer } = require('hyperwork')

class Message extends Mailer {
  static defaults = {
    from: 'acme <acme@acme.org>'
  }

  static sendFoo(user) {
    // https://nodemailer.com/message/
    this.mail({
      to: user.email,
      template: 'foo',
      locals: {
        bill: '$13'
      }
    })
  }
}

module.exports = Message
