# Generators and Variables

## `hygen generate`

Making new generators is easy:

```
$ hygen generator new --name my-new-generator

Loaded templates: _templates
       added: _templates/my-new-generator/new/hello.ejs.t

$ hygen

Error: please specify a generator.

Available actions:
generator: new, with-prompt
my-new-generator: new
```

To continue from here, we need to edit `hello.ejs.t` that was just generated:

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

But first let's look at structure and variables.

## Structure

For the structure below `hygen` knows about `mailer` and `new` because that's how template files are layed out on disk:

```
_templates/
  mailer/
    new/
      html.ejs.t
      text.ejs.t
```

Every time you call it, `hygen mailer new` automagically picks up the closest `_templates` folder, and renders all files in `mailer/new`. In this case it's `html.ejs.t` and `text.ejs.t`.

{% hint style='info' %}

* `hygen` simplifies things by asserting "command structure is folder structure".
* `hygen` will pick up the `_templates` in your current working directory.

{% endhint %}

## Variables

There are two ways to give `hygen` arguments, which become template variables:

1. Via CLI options, good for unattended generation.
2. Via prompts, asking the user to input them.

### CLI

To give `hygen` arguments via CLI, we follow this pattern:

```
$ hygen mailer new --name foobar --message hello --version 1
```

Any double-dash (`--`) argument becomes a variable we can use later in our templates.

We can then use `name`, `message` and `version`. Here's the contents of the template `html.ejs.t`:

```html
---
to: app/emails/<%= name %>.html
---
Hello <%= name %>,
<%= message %>
(version <%= version %>)
```

### Prompting

If you prefer some of your generators to be interactive (you can mix and match), you can use prompts.

Per generator, we include a `prompt.js` file, that will collect all variables from the user for this given generator.

```
_templates/
  worker/
    new/
      prompt.js    <-- your prompt file!
      html.ejs.t
```

Here's an example `prompt.js`

```javascript
module.exports = [
  {
    type: 'input',
    name: 'message',
    message: "What's your message?"
  }
]
```

The format is based on [inquirer](https://github.com/SBoudrias/Inquirer.js) so hopefully, nothing new to you.

And here's a sample template that uses this input variable later in a template file called `text.ejs.t`:

```html
---
to: app/message.txt
---
<%= message %>
```
