---
to: "<%= notGiven.length > 0 ? 'given/conditional/shouldnt-be-here' : null %>"
---

this should not render itself
because the 'notGiven' variable was never
given and 'to' results in null.
