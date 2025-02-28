---
inject: true
to: src/modules/database/seeds/relational/run-seed.ts
before: close
---
  await app.get(<%= name %>SeedService).run();
