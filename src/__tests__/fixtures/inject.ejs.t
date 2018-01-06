---
to: app/Gemfile
inject: true
skip_if: "gem '<%= name %>'"
after: "gem 'rails'"
---
gem '<%= name %>'
