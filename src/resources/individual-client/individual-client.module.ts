import { Module } from '@nestjs/common';
import { IndividualClientService } from './individual-client.service';
import { IndividualClientController } from './individual-client.controller';

@Module({
  controllers: [IndividualClientController],
    providers: [IndividualClientService],
})
export class IndividualClientModule {}
