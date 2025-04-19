import { Module } from '@nestjs/common';
import { IvaStatusController } from './iva-status.controller';
import { IvaStatusService } from './iva-status.service';

@Module({
  controllers: [IvaStatusController],
  providers: [IvaStatusService]
})
export class IvaStatusModule {}
