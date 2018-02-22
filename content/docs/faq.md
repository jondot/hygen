---
title: FAQ
doc: 5
section: 1
category: "tech"
type: "doc"
---

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

## Should I Check In My Templates?

Yes and yes!. One of the critical points with the `hygen` approach is that templates and generators are co-located with a project, to a team, to a branch. A team can also review templates in the same way they do their code.

## Isn't generating code counteracting DRY (don't repeat yourself)

Not in this case. `hygen` is build for modern app architectures, which demand modularity, clean code, and high maintainability and that are already DRY. This means there will be multiple tools requiring various ceremonies (most trivially - tests), that are set up by hand or by a combination of shortcuts. `hygen` wants to streamline all these, and give you the tools to save yourself some time.

## What's the difference from generator X/Y/Z?

First, it's not hard to start building the intuition by trying it out. Here's the short answer based on comparison with `plop`. See the full discussion [here](https://github.com/jondot/hygen/issues/1)

* Hygen was built to support a large number of teams, large number of developers and/or a big code base, so that it scales and evolves with your project and team. One difference between the two is that plop will make all these people, and activity share a single file which is a pain in merges, conflicts and code reviews. In addition hygen is contextual, so it will automatically understand where it is in your code base and what generators are relevant for each part (think about monorepos) and use only those.

* A design goal for hygen is to be instinctive - the amount of effort to make a generator and meet your goal from a developer experience perspective should always go to zero. So then you have generator generators, helpers, a familiar logic-full templating engine, and maybe a little bit surprising, but I think attention for details is super important - for example, there's someone (me) watching your back and making sure hygen is always fast.
