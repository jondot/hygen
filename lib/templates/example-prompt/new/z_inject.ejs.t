---
to: hygen-examples/mailers/<%= message || 'unnamed'%>/html.ejs
inject: true
before: You owe
skip_if: injected!
---
I was injected!!!