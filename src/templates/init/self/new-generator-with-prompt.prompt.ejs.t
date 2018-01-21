---
to: _templates/generator/with-prompt/prompt.ejs.t
---
---
to: _templates/<%%= name %%>/<%%= action || 'new' %%>/prompt.js
---

// see more examples for prompts
// https://github.com/SBoudrias/Inquirer.js/tree/master/examples
module.exports = [
  {
    type: 'input',
    name: 'message',
    message: "What's your message?"
  }
]
