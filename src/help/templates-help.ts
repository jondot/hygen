import { changeCaseHelp } from './change-case-help'
import { inflectionHelp } from './inflection-help'

export function templatesHelp() {
  return `
Template Helpers:
  You can use several provided helpers to transform and check text inside templates. 

    // example: <%= h.changeCase.camel(name) %>
    // example: <%= h.inflection.pluralize(name) %>

  ${changeCaseHelp()}

  ${inflectionHelp()}
  `
}
