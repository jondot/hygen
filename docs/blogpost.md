---
title: "Hygen: The scalable code generator that lives in your project"
---

![](https://github.com/jondot/hygen/raw/master/media/hygen.png)

`hygen` is a code generator that scales with your team. It's fast, flexible, and perfectly fits modular code bases. If you have a modular architecture, and if your code is tidy, there's a good chance you need `hygen`.

For the impatient, you can go ahead and play with it and check out the [Github repo](https://github.com/jondot/hygen). Here's the gist:

```
$ npm i -g hygen
$ cd your-project && hygen init self
$ hygen generator new --name my-gen
$ hygen my-gen
$ tree _templates
```

But if you'd like a story about software design as well, keep reading. It's told by hijacking a couple of fundemental user experience design laws (well, they're not _really_ laws, but, yea).


## Hick's Law

[Hick's law](https://en.wikipedia.org/wiki/Hick%27s_law) states that the time it takes for a person to make a decision is a result of the possible choices he or she has: increasing the number of choices will increase the decision time.

Turning to technology, choosing a new tool is a massive uptake of new choices, and the process of _learning_ that new tool amplifies it even more. Every step of the way, friction is the default. 

As far as code generators go, `hygen` has a primary design goal that is to minimize this friction. The rest - is bonus.

Every generator has a templating engine. But there's also meta data; like where to place the new file at. To do metadata we placed a front-matter in the _same_ template file, just like  [Jekyll](https://jekyllrb.com/)  does, and every jekyll inspired blog generator that surfaced over the last few years.

If you have your own static blog generated with Jekyll, or any other tool that's inspired by it, then this should be super familiar.

```
---
to: hygen-examples/mailers/<%= message || 'unnamed'%>/html.ejs
inject: true
before: "const modules = ["
skip_if: newModule
---
```

To render, we use `ejs` - a ubiquitous, non restricted (as opposed to logic-less) templating engine. If you want [logic in your templates](https://www.ebayinc.com/stories/blogs/tech/the-case-against-logic-less-templates/), go ahead; we trust that you're responsible. There's plenty of ways to shoot your own foot but above all we want to be pragmatic. 

From a syntax point of view a variant of `ejs` [probably](https://ruby-doc.org/stdlib-2.5.0/libdoc/erb/rdoc/ERB.html) [exists](https://en.wikipedia.org/wiki/PHP) in [what ever](http://www.makotemplates.org/) language you're coming from.


```
import View from './view'

storiesOf('<%= Name %>', module)
  .addDecorator(withKnobs)
  .addDecorator(withTests('<%= Name %>'))
  .add('default', () => <View />)
```


A batteries included approach; a set of built-in commands to guide you to the next step.

```
$ hygen init self
Loaded templates: src/templates
       added: _templates/generator/with-prompt/hello.ejs.t
       added: _templates/generator/with-prompt/prompt.ejs.t
       added: _templates/generator/new/hello.ejs.t

$ hygen generator new  --name mygen
Loaded templates: _templates
       added: _templates/mygen/new/hello.ejs.t
```

Intuitive argument parsing.

```
$ hygen module new --name auth --tokens bcrypt
```

And fantastic prompts, courtesy of [inquirer](https://github.com/SBoudrias/Inquirer.js).

```
$ hygen database setup --host localhost
? Select database (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ Postgres
 ◉ sqlite
 ◯ MySQL
```

`hygen` doesn't impose a new programming language, project setup, or workflow. Because it lives _in_ your project, and _in_ your existing workflow and setup.


## Parkinson's Law

Let's hijack Parkinson's law for a moment. This is _the_ problem with every generator framework I know.

>Work expands so as to fill all of the time available for its completion.

When you have code generation set up as a separate project in or out of your repo (say, with [cookiecutter](https://github.com/audreyr/cookiecutter) or [yeoman](https://github.com/yeoman/yo)), it will become _a thing_. A shiny new toy. 

At best, it becomes a product you look after that throws you out of context every time you want to tweak a template. At worst, it becomes stale and unmaintained - work invested, value never extracted.

## Rails Did It First


Wholesale project generators are still good for when you need an entire starter-project, although I doubt will survive given the surge of starter projects for which you can just `git clone` and move on.

They're also less great if you want to embed a generator workflow into your existing project, like [Rails](http://guides.rubyonrails.org/command_line.html#rails-generate) did when _it_ kickstarted the idea of having generators be a core part of developer productivity into mass adoption for the first time. 

Rails and  [Thor](https://github.com/erikhuda/thor), the generator framework it used, changed the way I thought about code generators. Up until then, when I needed to generate code (mostly for ORM entities, ah the times we had!) I was sucked up into [.NET's T4 Text Templates](https://en.wikipedia.org/wiki/Text_Template_Transformation_Toolkit). 

But trying to mimick Rails didn't always end up nicely. I quickly picked up Thor for [Albathor](https://github.com/jondot/albathor); an unholy amalgam of Rails's approach to code generation and the .NET build ecosystem


That was 7 years ago. I kept making generators  with Thor and friends hoping for productivity spikes. But these became projects I maintained which sucked up valuable time, counter-intuitively, the were lowering the returns in general productivity.

That only means one thing. A shopping list for a generator framework that stays out of your way.

* Process ergonomics - I don't want to compile my generators, or have them on a CI pipeline of their own.
* Developer ergonomics - easily accessible and easily invoked.
* Low friction - the _pitfall of success_. Each step I take should lead me to the next.
* Technology agnostic - don't want a new tech stack.
* Contextual - if I'm on the data layer, I want data generators.
* Scalable - should work for multiple teams iterating over a large and modular codebase.
* Feature packed - simple design doesn't mean a poor number of features.
* Flexible - give me a way to shoot my foot if I want to.
* Embeddable - can be composed into other projects. 
* Super customizable - defaults are OK, but give me escape hatches.
* Clean, intentful - first be useful, only then be cool.

That's what hygen became.

## Hygen

![](https://github.com/jondot/hygen/raw/master/media/hygen.gif)

You can use it right now, in what ever project you have open. Here's how to make a generator that adds a markdown document to your `docs/` folder.

```
$ npm i -g hygen
$ cd your-project
$ hygen init self
$ hygen generator new --name docs
```

Edit  `_templates/docs/new/hello.ejs.t`:

```
---
to: docs/<%= name %>.md
---

Hi!
I'm a document about <%= name %>
```

And then rename. The name of the file doesn't matter, it's for you, for bookeeping purposes.

```
$ mv _templates/docs/new/{hello,new-doc}.ejs.t
```

Done, let's make a doc:

```
$ hygen docs new --name architecture

Loaded templates: _templates
       added: docs/architecture.md
```

And now let's check this in:

```
❯ gs
A  _templates/docs/new/new-doc.ejs.t
A  _templates/generator/new/hello.ejs.t
A  _templates/generator/with-prompt/hello.ejs.t
A  _templates/generator/with-prompt/prompt.ejs.t
```

The `hygen generator new` command is _also_ checked in. This is part of the "flexibility" principle. It may be that you don't like the vanilla `hygen` generator for new generators. Go ahead and change it; then check it in. After this change all new generators you make will incorporate your _new way_ to make them.

## Power to the Generator

But the bigger idea here is to generate code. `hygen` lets you add multiple files, make injections to existing files, have prompts for interactivity with the user, and more.

Here's how to ease some Redux boilerplate fatigue.

These days I choose [ducks](https://github.com/erikras/ducks-modular-redux), to remove a little bit of boilerplate and have modularity baked in any app I build.

My typical Redux architecture would look like this:


```
app/
  components/
    icon.js
    avatar.js
  modules/
    boot.js     <---- glues modules together, requires chat, app, and auth.
    chat/
      index.js  <---- the 'connect' bit for Redux.
      view.js   <---- the view, separated, for testing.
      state.js  <---- reducer, actions, types, selectors.
    app/
      index.js
      view.js
      state.js
    auth/
      index.js
      view.js
      state.js
```

## Adding a Module

Adding a new module is very easy with `hygen`. Here's how your templates look like:

```
_templates/
  module/
    new/
      index.ejs.t
      view.ejs.t
      state.ejs.t
      inject_boot.ejs.t   <--- adds a 'require' clause to boot.js
```

Here's how `index` looks like:

```javascript
---
to: app/modules/<%= name %>/index.js
---
//
// requires, mappings, etc....
//
export default connect(...)(<%= Name %>)
```

A similar trick would do for `view` and `state`. 


How would we add a require line given that `boot.js` looks like this?

```javascript
// ... some bootstrapping code ...

const modules = [
    // <--- we want to inject a line here!
    require('chat').default,
    require('auth').default,
    require('app').default,
]

// ... rest of bootstrapping code ...
```

Let's build `inject_boot`:

```javascript
---
to: app/modules/boot.js
inject: true
skip_if: <%= name %>
after: "const modules = ["
---
require('./<%= name %>).default,
```

And we're done! Generating a new module is saying this:

```
$ hygen module new --name settings
```

## Use Hygen Today

There's more to see on [hygen.io](http://hygen.io) where the documentation lives at. But if you want a more gentle intro there's the digest form in the [README](http://github.com/jondot/hygen) _and_ `hygen` is built with zero configuration and no strings attached. So if you like trying things first, just install it, make a few generators and see if it fits you.

