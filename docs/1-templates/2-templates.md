# Templates

A `hygen` template is a header of a markdown-like frontmatter and a body of an ejs templating engine.

```html
---                            <----- frontmatter section
to: app/emails/<%= name %>.html
---

Hello <%= name %>,
<%= message %>                 <----- body, ejs
(version <%= version %>)
```

## Frontmatter

The frontmatter is delimited by a matching `---` top and bottom with `yaml` in it, where we define the template metadata.

Templates are also rendered, so if we have this in the file `_templates/mailer/campaign/emails.ejs.t`:

```yaml
---
to: app/<%=section%>/emails.js
foo: <%= bar %>
---
```

And this command:

```
$ hygen mailer campaign --section weekend --bar ping
```

It builds this frontmatter, behind the scenes:

```
to: app/weekend/emails.js
foo: ping
```

{% hint style='info' %}
`to:` is a required metadata variable, which tells `hygen` where to generate a given template.
{% endhint %}

## Template Body

Here's how a template looks like. Templates bodies are [ejs](https://github.com/tj/ejs):

```javascript
---
to: app/workers/<%=name%>.js
---

class <%= Name %> {
    work(){
        // your code here!
    }
}
```

The variable `name` is special, because you can get a capitalized version of it for free, by saying `Name`.

You can also use the built-in helpers by accessing `h`:

```javascript
class <%= h.capitalize(foobar) %> {
    work(){
        // your code here!
    }
}
```

Assuming we supplied `foobar` to `hygen`, of course. With time, we'll add more utilities onto `h`.

## Addition and Injection

By default templates are 'added' to your project as a new target file, but you can also choose to inject a template _into_ an existing target file.

For this to work, you need to use `inject: true` with the accompanied inject-specific props.

```yaml
---
to: package.json
inject: true
after: dependencies
skip_if: react-native-fs
---
"react-native-fs":"*",
```

This template will add the `react-native-fs` dependency into a `package.json` file, but it will not add it twice (see `skip_if`).

{% hint style='info' %}
In `after: dependencies`, 'dependencies' is actually a regular expression, so it'll find the `"dependencies":{` block in a `package.json` file
{% endhint %}

Here are the available mutually-exclusive options for where to inject at:

* `before | after` - a regular expression / text to locate. The inject line will appear before or after the located line.
* `prepend | append` - add a line to start or end of file respectively.
* `line_at` - add a line at this exact line number.

You can guard against double injection:

* `skip_if` - a regular expression / text. If exists injection is skipped.
