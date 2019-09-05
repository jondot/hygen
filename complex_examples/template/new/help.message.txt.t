---
to: <%- helpMessagePath %>
---
<%- '---' %>
message: |
  {blue.bold action new}
    Describe action here

    {bold Usage:}
    {yellow hygen} {yellow.bold <%- `${name} ${action}` %>} --name NAME

    {bold Options:}
      --name      name of the generator

<%- '---' %>
