---
title: Templates
doc: 2
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

## Helpers and Inflections

You can also use the built-in helpers by accessing `h`:

```javascript{3}
class <%= Name %> {
    work(){
        return "<%= h.capitalize(message) %>"
    }
}
```

The special helper object `h` also hosts _inflections_. With these you can pluralize, singularize and more:

```
// example: <%= h.inflection.pluralize(name) %>

pluralize( str, plural )
singularize( str, singular )
inflect( str, count, singular, plural )
camelize( str, low_first_letter )
underscore( str, all_upper_case )
humanize( str, low_first_letter )
capitalize( str )
dasherize( str )
titleize( str )
demodulize( str )
tableize( str )
classify( str )
foreign_key( str, drop_id_ubar )
ordinalize( str )
transform( str, arr )
```

You can see the full list [here](https://github.com/dreamerslab/node.inflection). With time, we'll add more utilities onto `h`.

## Local Variables

As we saw earlier, any CLI argument or prompt parameter automatically becomes a local variable in your templates.

There are two ways to refer to variables:

```javascript
Hello <%= message %>
```

This way refers to the `message` CLI argument or prompt parameter, in its bare form. This also means this parameter cannot be optional (otherwise a reference error is thrown).

```javascript
Hello <%= locals.message %>
```

This way refers to the `message` CLI argument or prompt parameter, through the `locals` object. This is great if you want to check a variable for existance before using it like so:

```javascript
<% if(locals.message){ -%>
    message: <%= message %>
<% -%>
```

There's a small gem here, in the form of `-%>`. This will slurp the last newline, so that the `if(..){` clause won't generate garbage newlines into our final output.

For more of how `EJS` works [take a look here](https://github.com/mde/ejs).

## Predefined Variables

If you look at the following command:

```
hygen component new:story
```

`hygen` will break it up for you and place certain values in special variables that are automatically available in your templates:

| Variable       | Content                   | Example                       |
| -------------- | ------------------------- | ----------------------------- |
| `templates`    | Templates path (absolute) | /User/.../project/\_templates |
| `actionfolder` | Action path               | /.../component/new            |
| `generator`    | Generator name            | `component`                   |
| `action`       | Action name               | `new`                         |
| `subaction`    | Sub-action name           | `story`                       |
| `cwd`          | Process working directory | /User/.../project             |

For example to use `actionfolder` say:

```javascript
<%= actionfolder %>
```

## Addition

By default templates are 'added' to your project as a new target file. By specifying a `to:` frontmatter property, we're telling `hygen` where to put it.

```yaml
---
to: app/index.js
---
console.log('this is index!')
```

If a target file already exists, and you don't want to overwrite it, you can use `unless_exists` (here's the [pull request](https://github.com/jondot/hygen/pull/27) for more).

```yaml
---
to: app/index.js
unless_exists: true
---
will not render if target exists
```

## Injection

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
* `at_line` which contains a line number will add a line at this exact line number.

In almost all cases you want to ensure you're not injecting content twice:

* `skip_if` which contains a regular expression / text. If exists, injection is skipped.

Let's see how these play out in the [Redux](/redux) use case.

## Shell

Shell actions give you the ability to trigger any shell commands. You can do things such as:

* Copy a resource or an asset from a template into a target folder
* Pipe the output of a template into a shell command
* Perform any other side-effect - touch files, restart processes, trigger a `yarn install` or what have you.

Here's how to pipe a generator's output into a shell command:

```yaml
---
sh: "mkdir -p <%= cwd %>/given/app/shell && cat > <%= cwd %>/given/app/shell/hello.piped"
---
hello, this was piped!
```

Using just the `sh:` property, `hygen` will understand this is a shell action. Note that you have the `cwd` variable pre-available to you to indicate the current working directory.

This generator will _pipe_ its output into the shell command, so you can assume it happens - note that `cat` is expecting someone to give it `STDIN`.

Some times you want to run a generator and just invoke an additional command. This means the shell action can be added to what ever action you wanted to perform (inject or addition).

Here's a common task: add a dependency and then run `yarn install`.

```yaml
---
inject: true
to: package.json
after: dependencies
skip_if: lodash
sh: cd <%= cwd %> && yarn install
---
"lodash":"*",
```

## Conditional Rendering

If you'd like to render a certain template based on the value of a variable, then you can do something like this:

```yaml
---
to: "<%= message ? 'where/to/render' : null %>"
---
conditionally rendering template
```

When `hygen` meets a `to:` value that is `null`, it will skip the output of that template, meaning it won't get rendered at all.

Next up, we'll move on to [generators](/generators).
