---
title: Generators
doc: 3
section: 1
category: "tech"
type: "doc"
---

With `hygen`, every time you spot a repetitive task, or a hidden structure in files you're editing, you'll quickly make a new generator.

```lua{1,5,15}
$ hygen generator new --name mailer
                              `-------- just a name you pick.

Loaded templates: _templates
       added: _templates/mailer/new/hello.ejs.t
                                       `------ your template file.


$ hygen

Error: please specify a generator.

Available actions:
generator: new, with-prompt
mailer: new
    \
     `----------- your new generator is already here!
```

The moment we add a generator under `_templates`, it's ready to use. Here's `hello.ejs.t` that was placed in the template folder for you:

```javascript
---
to: app/hello.js
---
const hello = `
Hello!
This is your first hygen template.

Learn what it can do here:

https://github.com/jondot/hygen
`

console.log(hello)
```

To make real mailer, let's copy this file and rename it a bit:

```bash
$ mv _templates/mailer/new/{hello.js,html.ejs.t}
$ cp _templates/mailer/new/{html.ejs.t,text.ejs.t}
```

We use a `.t` suffix because it disables our editor trying to be smart - use what ever you like. For this example these files represent the HTML and text forms of an email sender.

[[info]]
| ###### Creative Freedom
| hygen doesn't care about file names or file types in your generator folders. It only cares about folder structure and the _contents_ of your files.

Also note that each template has a _frontmatter_ delimited by a pair of `---`'s. In our example, we have a special `to:` property which tells `hygen` where to put the generated file. We'll see more of these in [templates](/templates).

## Structure

Let's look at our folder structure:

```
_templates/
  mailer/
    new/
      html.ejs.t
      text.ejs.t
app/
  index.js
package.json
```

Every time you call it, `hygen mailer new` automagically picks up the closest `_templates` folder, and renders all files in `mailer/new`. In this case it's `html.ejs.t` and `text.ejs.t`.

[[info]]
|###### Hygen is Contextual
|`hygen` simplifies things by asserting "command structure is folder structure".
|
|
|`hygen` will pick up the `_templates` in your current working directory.

## CLI Arguments

To give `hygen` arguments via CLI, we follow this pattern:

```
$ hygen mailer new --name foobar --message hello --version 1
```

Any double-dash (`--`) argument becomes a variable we can use later in our templates. In the example above we can use `name`, `message` and `version`.

Here's the contents of the template `html.ejs.t` with the variables in place:

```yaml
---
to: app/emails/<%= name %>.html
---
<h1>Hello <%= name %></h1>
<%= message %>
(version <%= version %>)
```

Try making the text variant yourself by editing `text.ejs.t`. Note: you want to put it in the correct place with `to:`.

## Prompting Arguments

If you prefer some of your generators to be interactive (you can mix and match), you can use prompts.

Per generator, include a special `prompt.js` file. It will declare all variables to collect from the user for a given generator.

```bash{3,4}
_templates/
  mailer/
    new/           <-- the mailer new generator
      prompt.js    <-- your prompt file!
      html.ejs.t
      text.ejs.t
```

Here's an example `prompt.js` declaring a `message` input variable:

```javascript
module.exports = [
  {
    type: 'input',
    name: 'message',
    message: "What's your message?"
  }
]
```

The format is based on the very popular [inquirer](https://github.com/SBoudrias/Inquirer.js), so hopefully, nothing new to you. Let's use the `message` variable now:

```html{4}
---
to: app/emails/<%= name %>.txt
---
<%= message %>
```

Note that the `name` variable has to come from the CLI. To generate, we'll do this:

```
$ hygen mailer new --name fancy-mailer
```

Which will ask the user for the `message`, and generate all contents.

## Advanced Params

It's possible to create a "recursive" flow where you ask some questions, run some computation and ask some more questions, creating a multi-step prompt.

In addition, it's possible to skip prompting, or re-shape parameters that were given to you from either CLI or prompt, so that you can do it in a central place.

You can "enable" advanced params and prompting by replacing your `prompt.js` file with an `index.js` file in your action:

```
my-generator
  my-action/
    index.js
    template1.ejs.t
    template2.ejs.t
```

Here's how you can use `index.js` to build a two-step prompting flow. Instead of exporting an array of question types as with the `prompt.js` file, you now need to export an object with a function called `prompt`:

```javascript{3}
// my-generator/my-action/index.js
module.exports = {
  prompt: ({ inquirer, args }) =>
    inquirer
      .prompt({
        type: 'input',
        name: 'email',
        message: "What's your email?"
      })
      .then(({ email }) =>
        inquirer.prompt({
          type: 'input',
          name: 'emailConfirmation',
          message: `Please type your email [${email}] again:`
        })
      )
}
```

The `prompt` function gets a data structure with an `inquirer` field you can use.

For completeness, here is a [a more elaborate use of prompts](https://github.com/jondot/hygen/issues/35) (thanks [@jaykoontz](https://github.com/jaykoontz)).

You can skip prompting conditionally using custom logic:

```javascript{4,6}
// my-generator/my-action/index.js
module.exports = {
  prompt: ({ inquirer, args }) => {
    if (args.age > 18) {
      return Promise.resolve({ allow: true })
    }
    return inquirer.prompt({
      type: 'input',
      name: 'age',
      message: 'whats your age?'
    })
  }
}
```

You can skip _physically_ prompting and use `params` to build more sophisticated parameters out of your CLI parameters:

```javascript{2}
// my-generator/my-action/index.js
module.exports = {
  params: ({ args }) => {
    return { moreConvenientName: args.foobamboozle }
  }
}
```

[[info]]
| ###### Params and Prompts are The Same
| If you think about it, prompting for variables or reshaping CLI arguments lead to the same goal: new parameters. But to make a future-proof API, we've separated the two intents to the `prompt` and `params` functions.

## Documenting Your Generators

Since there's a special `message` prop you can use in any template, you can use that to build generator help screens. Ultimately, your generator should be documenting itself.

Looking at our generator layout from before, we add a `help` action:

```bash{3,4}
_templates/
  mailer/
    help/
      index.ejs.t
    new/
      prompt.js
      html.ejs.t
      text.ejs.t
```

Our `index.ejs.t` is simply a blank template, with just a `message:` prop:

```yaml
---
message: |
  - hygen {bold mailer} new --name [NAME]
---
```

The special `|` annotation is a YAML literal block. Should you need it, [here's a quick YAML refresher](https://learnxinyminutes.com/docs/yaml/).

Note that in `message` you can have a special coloring syntax, which can spice up your self-documenting generators.

Here's a few examples:

```javascript
{bold mailer}
{red mailer}
{underline mailer}
{green mailer}
```

For more styles [check out chalk](https://github.com/chalk/chalk#styles).

## Selecting Parts of a Generator

In addition to what we've seen until now, `hygen` lets the user select parts of a generator.

The complete form is:

```
$ hygen GENERATOR ACTION:SUBACTION
```

Where `SUBACTION` is a regular expression or a simple string `hygen` uses to pick up the subset of templates you want from a generator.

Using our mailer example, this generates only the text part:

```
$ hygen mailer new:text --name textual-mailer
```

Because we have a file named `text.ejs.t`, the string `text` in `new:text` will match it.

In the same way we could have used a proper regular expression:

```
$ hygen mailer new:.*xt --name textual-mailer
```

That's about it for generators.

That's it for now, you're invited to take a look at the [FAQ](/faq), and [Packages](/packages).
