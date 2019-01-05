---
to: given/app/mailers/<%= message || 'unnamed'%>/html.ejs
inject: true
before: !!js/regexp /You owe/g
skip_if: injected!
---
I was injected!!!