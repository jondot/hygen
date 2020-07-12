---
title: Quick Start
id: quick-start
---

You can have plenty of ways to run `hygen`. Pick one of the following:

On macOS and Homebrew:

```
$ brew tap jondot/tap
$ brew install hygen
```

Globally with npm (or yarn):

```
$ npm i -g hygen
```

Or, if you like a no-strings-attached approach, use
with [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)

```
$ npx hygen ...
```

Should any of these be confusing to you, check out the [binary releases](https://github.com/jondot/hygen/releases) where you'll find a binary for every major platform.

With this done, let's use a `hygen` generator.

To use a generator, we supply a `GENERATOR ACTION` pair like so (here `mailer` and `new` are examples).

```
$ hygen mailer new [NAME]
         |      ^----- action
         `------------ generator
```

[[info]]
| New in hygen 4.0.0: a positional `NAME` parameter to save a bit of typing. With versions prior to 4.0.0 you still have to use `--name NAME`.

Here's a quick run-down to get to your own generator:

```bash
$ hygen init self
$ hygen generator new awesome-generator
$ hygen awesome-generator new hello
```

To see the `generator` help, you could always do:

```bash
$ hygen generator help

Loaded templates: _templates
help:
hygen generator new [NAME] --action [ACTION]
hygen generator with-prompt [NAME] --action [ACTION]
```

Finally, use `--dry` to do a test-run of your generators.

Congratz! you've made a new generator called `awesome-generator`!

Let's walk through what we just did.

[[info]]
| You can also install `hygen` from Homebrew or download a standalone binary. For more, see [standalone](/docs/standalone).

## Bootstrapping Your Project

Use `hygen init self` to start using it in your own project. `hygen` comes with two pre-built generators that helps you build your own - although it was built to ease the boilerplate fatigue for React, Redux, and Node.js it can be use for any technology really.

```yaml{2}
$ cd your-project
$ hygen init self

Loaded templates: src/templates
       added: _templates/generator/with-prompt/hello.ejs.t
       added: _templates/generator/with-prompt/prompt.ejs.t
       added: _templates/generator/new/hello.ejs.t
```

This creates a project-local `_templates` folder for you at your source root with two helper generators that saves you time:

* `hygen generator new generatorName` - builds a new generator for you
* `hygen generator with-prompt new generatorName` - the same as before, only this one will be prompt driven.

[[info]]
|###### Template Locality
|On multi-team projects, each team can have their own templates right there in the shared repo.

Still in your project root, let's create a new generator now:

```yaml
$ hygen generator new mygen
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

That's it! we've done a basic walkthrough of `hygen`. Next up is a detailed overview of [templates](/docs/templates) and [generators](/docs/generators).

## Invoking Generators

There are more ways to play with a generator after you've built it:

```perl
# generate all files, with a 'name' variable
$ hygen example-prompt new reporter


# generate one specific file, picked up based on the substring 'mailer'
$ hygen example-prompt new:mailer reporter


# generate all resources that correspond to a regular expression
$ hygen example-prompt 'new:.*html' reporter
```

You made it to the end! nice! Now check out [templates](/docs/templates) and [generators](/docs/generators).
