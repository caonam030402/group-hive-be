---
inject: true
to: src/modules/app.module.ts
after: imports
---
    <%= h.inflection.transform(name, ['pluralize']) %>Module,