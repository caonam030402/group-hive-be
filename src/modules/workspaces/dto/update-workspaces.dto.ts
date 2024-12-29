// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateWorkspacesDto } from './create-workspaces.dto';

export class UpdateWorkspacesDto extends PartialType(CreateWorkspacesDto) {}
