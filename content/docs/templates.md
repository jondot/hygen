---
title: Templates
doc: 3
section: 1
category: "tech"
type: "doc"
---

A `hygen` template is a header of a markdown-like frontmatter and a body of an ejs templating engine.

```yaml
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

```yaml{1,4}
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

```yaml
---
to: app/weekend/emails.js
foo: ping
---
```

[[info]]
|###### Frontmatter cleans up our act
|While other generator engines use the file names, folder structure, or arbitrary configuration files to store metadata, `hygen` uses the frontmatter.
|
|This makes templating and generators clean and maintainable and meta data lives directly in the template it refers to.

## Template Body

Let's recall how a template looks like. Templates bodies are [ejs](https://github.com/tj/ejs):

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

In `hygen`, the variable `name` is blessed, because you can get a capitalized version of it for free, by saying `Name`. There will be a growing list of variables that are special, where you get 'free' version of them to save some time, but currently it's only that one.

If we wanted to capitalize some other variable then we could do this:

```javascript{4-6}
---
to: app/workers/<%=name%>.js
---
<%
 Message = message.toUpperCase()
%>

class <%= Name %> {
    work(){
        return "<%= Message %>"
    }
}
```

You can also use the built-in helpers by accessing `h`:

```javascript{3}
class <%= Name %> {
    work(){
        return "<%= h.capitalize(message) %>"
    }
}
```

With time, we'll add more utilities onto `h`.

## Addition

By default templates are 'added' to your project as a new target file. By specifying a `to:` frontmatter property, we're telling `hygen` where to put it.

```yaml
---
to: app/index.js
---
console.log('this is index!')
```

### Injection

You can also choose to inject a template _into_ an existing target file.

For this to work, you need to use `inject: true` with the accompanied inject-specific props.

```yaml{2}
---
inject: true
to: package.json
after: dependencies
skip_if: react-native-fs
---
"react-native-fs":"*",
```

The new props to notice here are `after` and `skip_if`. This template will add the `react-native-fs` dependency into a `package.json` file, but it will not add it twice (because of `skip_if`).

[[info]]
|###### Regular expressions everywhere promote flexibility
| In `after: dependencies`, 'dependencies' is actually a regular expression, so it'll find the `"dependencies":{` block in a `package.json` file

Here are the available properties for an `inject: true` template:

* `before` or `after` which contain a regular expression of text to locate. The inject line will appear `before` or `after` the located line.
* `prepend` or `append`, when true, add a line to start or end of file respectively.
* `line_at` which contains a line number will add a line at this exact line number.

In almost all cases you want to ensure you're not injecting content twice:

* `skip_if` which contains a regular expression / text. If exists, injection is skipped.

Let's see how these play out in the [Redux](redux) use case.
