---
to: given/config/nodemailer.js
cmd: yarn add nodemailer nodemailer-browserpreview-transport
---
const nodemailer = require('nodemailer')

let transport = null
if (process.env.NODE_ENV !== 'production') {
  const browserPreviewTransport = require('nodemailer-browserpreview-transport')
  transport = nodemailer.createTransport(
    browserPreviewTransport({
      dir: '/tmp'
    })
  )
} else {
  transport = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: 'username@example.com',
      pass: 'userpass'
    }
  })
}

module.exports = transport
