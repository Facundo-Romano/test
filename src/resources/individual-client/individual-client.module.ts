import { Module } from '@nestjs/common';
import { IndividualClientController } from './individual-client.controller';
import { IndividualClientService } from './individual-client.service';

@Module({
  controllers: [IndividualClientController],
  providers: [IndividualClientService]
})
export class IndividualClientModule {}
