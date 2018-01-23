<h3 align="center">
  <img src="./images/hygen.png" alt="hygen logo" width=400 />
</h3>


[![build status](https://img.shields.io/travis/jondot/hygen/master.svg)](https://travis-ci.org/jondot/hygen)
[![npm version](https://img.shields.io/npm/v/hygen.svg)](https://www.npmjs.com/package/hygen)
[![GitHub stars](https://img.shields.io/github/stars/jondot/hygen.svg?style=social&label=Stars)](https://github.com/jondot/hygen)

`hygen` is the simple, fast, and scalable code generator that lives _in_ your project.
## Quick Start

Install `hygen`:

```
$ npm i -g hygen
```

`hygen` can demo itself, bootstrap itself and has commands to build new generators.

### Exploring the Demo

We use `hygen` by supplying a `hygen GENERATOR ACTION` pair:

```
$ hygen mailer new
         |      ^----- action
         `------------ generator
```

Here `mailer` is the generator and `new` is the action.
When first using it after a fresh install, `hygen` will show the demo templates it comes prepackaged with. Let's try one:

```
$ cd /tmp
$ hygen

Error: please specify a generator.

Available actions:
example: new
example-prompt: new
init: self

$ hygen example-prompt new
? What's your message? welcome

Loaded templates: src/templates
       added: hygen-examples/mailers/unnamed.js
       added: hygen-examples/mailers/hello/html.ejs
       added: hygen-examples/mailers/hello/subject.ejs
       added: hygen-examples/mailers/hello/text.ejs
      inject: hygen-examples/mailers/hello/html.ejs
```

This generated content into the current working directory in `hygen-example/`. Folder structure is created automatically.

{% hint style='tip' %}
Try to explore the generated files from the demo generator to get a feel for a how a generator looks like.
{% endhint %}

Here's a few more ways to play with the demo templates:

```perl
# generate all required worker files, with a name variable
$ hygen example-prompt new --name reporter


# generate one specific file
# the 'example' generator template layout is:
# example/
#   new/
#     mailer.ejs.t  
#     templates_html.ejs.t
#     templates_subject.ejs.t  
#     templates_text.ejs.t  
#     z_inject.ejs.t
#
$ hygen example-prompt new:mailer --name reporter


# generate all files that correspond to a regular expression
$ hygen example-prompt 'new:.*html' --name reporter
```

### Starting Out

When you're ready, start using `hygen` in your own project:

```
$ cd your-project
$ hygen init self

Loaded templates: src/templates
       added: _templates/generator/with-prompt/hello.ejs.t
       added: _templates/generator/with-prompt/prompt.ejs.t
       added: _templates/generator/new/hello.ejs.t
```

This creates a project-local `_templates` folder for you at your source root. We just used a generator that generates... generators!

{% hint style='info' %}
Template locality is a `hygen` principle which lets it scale out. On multi-team projects, each team can have their own templates right there in the shared repo.
{% endhint %}

With that ready, here's how to create your first new generator:

```
$ hygen generator new --name mygen
Loaded templates: _templates
       added: _templates/mygen/new/hello.ejs.t
```

We'll see templates work and how to edit them later, but now, let's use this new generator:

```
$ hygen mygen new

Loaded templates: _templates
       added: app/hello.js
```

{% hint style='info' %}
Instead of bundling the `hygen generator new` command in the `hygen` package, we chose to copy it to your local templates. In this way you can even tweak the way `hygen` generates new generators. More importantly, it scales to a set up with many teams, as each might have its own preference.
{% endhint %}

Again, notice that, running `hygen` loads the `_templates` it sees from the place you run it.
