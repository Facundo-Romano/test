import { Module } from '@nestjs/common';
import { LegalEntityClientController } from './legal-entity-client.controller';
import { LegalEntityClientService } from './legal-entity-client.service';

@Module({
  controllers: [LegalEntityClientController],
  providers: [LegalEntityClientService]
})
export class LegalEntityClientModule {}
