// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOtpDto } from './create-otp.dto';

export class UpdateOtpDto extends PartialType(CreateOtpDto) {}
