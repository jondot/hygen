---
title: FAQ
id: faq
---

## Why Should I use Hygen?

There's a few generator toolkit right now, arguably Yeoman is the most popular. To understand why to use Hygen over anything else, first -- some context.

Hygen was born to solve developer effectiveness in a multi-team, multi-module monorepo containing frontend (React, Redux) and backend (Node.js) projects. Every team had its nuances, ceremonies and how it kept itself effective. Every project had those as well.

Using Hygen, developers could create many different generators, suiting any kind of development workflow, and they could change, evolve, improve and adapt their generators to their ever evolving project and workflow.
When this is the reality, you also want to keep your generator code as close to your actual code as possible. For example, you want to include generator changes in the same PR as your code for it to be reviewed.

Using Yeoman, you focus on consuming _community generators_ rather than producing your own. And in the context that we've described, it would be like hitting a brick wall. You can't build Yeoman generators fast enough. More over, you can't keep them close to your codebase because they need to be independent projects, and you need to develop the skillset, and every time you want to tweak something, you need to call your Yeoman expert.

While Yeoman is great for building self-sufficient, whole-sale generator for a specific problem by a person that's passionate about it -- with Hygen, your _team_ builds generators, all the time, collaboratively.




## How do I lowercase, uppercase or transform variables?

`ejs` lets you use Javascript, so plenty of what you know is already available. You can transform text inline and make new variables in code blocks on template body on the fly.

```yaml
---
to: app/reducers/<%= reducer.toLowerCase() %>.js
---
<%
    defaulted = reducer || 'my-reducer'
%>
Hello <%= defaulted %>.
```


## Can I inject using regular expressions that span across newlines in the target file?

`hygen` is designed to work on a line-by-line basis. Injection inserts the _lines_ of the template _between lines_ (by `\n`) of the target file according to the expression supplied.

However, as of v2.1.2 or later, `hygen` supports multi-line regular expressions in the `before`, `after`, and `skip_if` injection properties.  This works in the following ways:

* `skip-if` is now always evaluated as a potentially multi-line expression across the entire target file.

* `before` and `after` first try to match the expression within any single line of the target file. If no match is found, they then attempt a multi-line match.

* `before` will inject before the line on which the match began, and `after` will inject after the line on which the match ended.

## I Want To Use Generators From a Single Place

If you have several `_templates` locations throughout a project (let's say for a server and client), you might usually `cd` into each sub-project to use hygen like so:

```
[src/] $ cd server
[server/] $ hygen route new --name authentication
[server/] $ cd ../client
[client/] $ hygen page new --name authentication
```

Hygen was built to this kind of workflow.

But it may be that you want to run those from your top `src/` vantage point and not dive into each subfolder:

```
[src/] $ hygen route new --name authentication
[src/] $ hygen page new --name authentication
```

Hygen doesn't support discovering templates down the folder trees out of the box because currently there isn't a good idea for how to do this without compromising the superfast performance Hygen holds.

However Hygen is super flexible with regards to template location, so here's how to achieve this goal with little effort, by dropping these into the scripts of your `package.json` file:

```
    "g:client":
      "HYGEN_TMPLS=src/client/_templates hygen",
    "g:server":
      "HYGEN_TMPLS=src/server/_templates hygen",
```

And now your flow is simply:

```
[src/] $ yarn g:client page new --name authentication
[src/] $ yarn g:server page new --name authentication
```

A nice bonus is that this streamlines into your `yarn` workflow and you can change and improve it as you go.

This was inspired by a community contributed solution, [see here for more](https://github.com/jondot/hygen/issues/24).

## Should I Check In My Templates?

Yes and yes!. One of the critical points with the `hygen` approach is that templates and generators are co-located with a project, to a team, to a branch. A team can also review templates in the same way they do their code.

## Isn't generating code counteracting DRY (don't repeat yourself)

Not in this case. `hygen` is build for modern app architectures, which demand modularity, clean code, and high maintainability and that are already DRY. This means there will be multiple tools requiring various ceremonies (most trivially - tests), that are set up by hand or by a combination of shortcuts. `hygen` wants to streamline all these, and give you the tools to save yourself some time.

## What's the difference from generator X/Y/Z?

First, it's not hard to start building the intuition by trying it out. Here's the short answer based on comparison with `plop`. See the full discussion [here](https://github.com/jondot/hygen/issues/1)

* Hygen was built to support a large number of teams, large number of developers and/or a big code base, so that it scales and evolves with your project and team. One difference between the two is that plop will make all these people, and activity share a single file which is a pain in merges, conflicts and code reviews. In addition hygen is contextual, so it will automatically understand where it is in your code base and what generators are relevant for each part (think about monorepos) and use only those.

* A design goal for hygen is to be instinctive - the amount of effort to make a generator and meet your goal from a developer experience perspective should always go to zero. So then you have generator generators, helpers, a familiar logic-full templating engine, and maybe a little bit surprising, but I think attention for details is super important - for example, there's someone (me) watching your back and making sure hygen is always fast.

## Can I Inject Multiple Times for the Same File?

Yes! Have multiple template files, each responsible to a different part
of the injection:

```
my-generator/
  new/
    index.js.t
    add-redux-to-package.json.t   <-- injects to package.json
    add-lodash-to-package.json.t  <-- injects to package.json
```

Hygen will parallelize most of its book-keeping to gain speed, but file operations _are serially executed_ to avoid operations stepping on eachother's toes.

## Generating from a deep directory and inject to an upper one

This is possible with adding a helper to `.hygen.js`:

```javascript{6}
//.hygen.js
module.exports = {
  templates: `${__dirname}/_templates`,
  helpers: {
    relative: (from, to) => path.relative(from, to),
    src: ()=> __dirname
  }
}
```

And use it:

```yaml
---
to: "<%= h.src() %>/src/index.js"
---
```

See [this discussion](https://github.com/jondot/hygen/issues/49) for more.

## Can I Force Hygen to always Overwrite? (e.g. --force)

To avoid prompts, and force overwrites you can use the `HYGEN_OVERWRITE` environment flag.

```
$ HYGEN_OVERWRITE=1 hygen generator new --name foobar
```

If you use this, Hygen will always write out content without asking even if the file already exists.

