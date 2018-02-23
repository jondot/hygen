---
to: "<%= notGiven ? 'app/shouldnt-happen' : null %>"
---

this should not render itself
because the 'notGiven' variable was never
given and 'to' results in null.
