import { Module } from '@nestjs/common';
import { MaritalStatusController } from './marital-status.controller';
import { MaritalStatusService } from './marital-status.service';

@Module({
  controllers: [MaritalStatusController],
  providers: [MaritalStatusService]
})
export class MaritalStatusModule {}
