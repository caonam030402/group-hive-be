// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateDocsHubDto } from './create-docs-hub.dto';

export class UpdateDocsHubDto extends PartialType(CreateDocsHubDto) {}
