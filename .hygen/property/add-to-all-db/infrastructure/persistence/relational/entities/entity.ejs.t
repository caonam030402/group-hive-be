---
inject: true
to: src/modules/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity.ts
after: export class <%= name %>Entity
---

@ApiProperty()
@Column()
<%= property %>: <%= type %>;
