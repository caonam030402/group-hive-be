---
inject: true
to: src/modules/database/seeds/relational/run-seed.ts
after: \@nestjs\/core
---
import { <%= name %>SeedService } from './<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>-seed.service';