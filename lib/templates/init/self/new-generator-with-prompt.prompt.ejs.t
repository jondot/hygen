---
to: _templates/generator/with-prompt/prompt.ejs.t
---
---
to: _templates/<%%= name %%>/<%%= action || 'new' %%>/prompt.js
---

// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types
//
// and for examples for prompts:
// https://github.com/SBoudrias/Inquirer.js/tree/master/examples
module.exports = [
  {
    type: 'input',
    name: 'message',
    message: "What's your message?"
  }
]
