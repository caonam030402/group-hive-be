import { Module } from '@nestjs/common';
import { OtpRepository } from '../otp.repository';
import { OtpRelationalRepository } from './repositories/otp.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity])],
  providers: [
    {
      provide: OtpRepository,
      useClass: OtpRelationalRepository,
    },
  ],
  exports: [OtpRepository],
})
export class RelationalOtpPersistenceModule {}
