---
to: given/shell/hmm.txt
sh: touch <%= cwd %>/given/shell/side-effect.hello
---
this should be rendered into hmm.txt as usual.
but the shell action should create the file 'side-effect.hello' as well.
