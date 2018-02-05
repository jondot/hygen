---
title: Quick Start
doc: 1
section: 1
category: "tech"
type: "doc"
---

Install `hygen`:

```
$ npm i -g hygen
```

Supply a `GENERATOR ACTION` pair:

```
$ hygen mailer new
         |      ^----- action
         `------------ generator
```

After a fresh install, `hygen` will use the example generators it comes with. Let's try one:

```yaml{1}
$ hygen example-prompt new
? What's your message? welcome

Loaded templates: src/templates
       added: hygen-examples/mailers/unnamed.js
       added: hygen-examples/mailers/hello/html.ejs
       added: hygen-examples/mailers/hello/subject.ejs
       added: hygen-examples/mailers/hello/text.ejs
      inject: hygen-examples/mailers/hello/html.ejs
```

There are a few more ways to play with the examples:

```perl
# generate all files, with a name variable
$ hygen example-prompt new --name reporter


# generate one specific file
$ hygen example-prompt new:mailer --name reporter


# generate all resources that correspond to a regular expression
$ hygen example-prompt 'new:.*html' --name reporter
```

## Bootstrapping Your Project

Use `hygen init self` to start using it in your own project (it also gets rid of the example generators).

```yaml{2}
$ cd your-project
$ hygen init self

Loaded templates: src/templates
       added: _templates/generator/with-prompt/hello.ejs.t
       added: _templates/generator/with-prompt/prompt.ejs.t
       added: _templates/generator/new/hello.ejs.t
```

This creates a project-local `_templates` folder for you at your source root with two helper generators that saves you time:

* `hygen generator new --name generatorName` - builds a new generator for you
* `with-prompt new --name generatorName` - the same as before, only this one will be prompt driven.

[[info]]
|###### Template Locality
|On multi-team projects, each team can have their own templates right there in the shared repo.

Still in your project root, let's create a new generator now:

```yaml
$ hygen generator new --name mygen
Loaded templates: _templates
       added: _templates/mygen/new/hello.ejs.t
```

And let's use it:

```yaml{4}
$ hygen mygen new

Loaded templates: _templates
       added: app/hello.js
```

[[info]]
|###### Did You Notice?
|Instead of bundling the `hygen generator new` command in `hygen`, we chose to _copy_ it to your local templates folder.
|
|
|In this way you can even tweak the way `hygen` generates new generators. It scales to a set up with different teams, each with its own preference.

That's it! we've done a basic walkthrough of `hygen`. Next up is a detailed overview of [generators](generators) and [templates](templates).
