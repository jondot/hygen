---
to: given/app/workers/<%= (name || 'unnamed-worker') %>.js
---
<%
  name = name || 'unnamed'
  Name = h.capitalize(name)
%>const { Worker } = require('hyperwork')
const asyncwork = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000)
  })
}

class <%= Name %> extends Worker {
  async perform({ data }) {
    this.log('started work')
    await asyncwork()
    this.log('finished work')
  }
}

module.exports = <%= Name %>
