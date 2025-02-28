---
inject: true
to: src/modules/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.ts
before: export class Create<%= name %>Dto
skip_if: "} from 'class-validator'"
---
<% if (isAddToDto) { -%>
import {
  // decorators here
} from 'class-validator';
<% } -%>