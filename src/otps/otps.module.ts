import { Module } from '@nestjs/common';
import { OtpsService } from './otps.service';
import { OtpsController } from './otps.controller';
import { RelationalOtpPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalOtpPersistenceModule],
  controllers: [OtpsController],
  providers: [OtpsService],
  exports: [OtpsService, RelationalOtpPersistenceModule],
})
export class OtpsModule {}
