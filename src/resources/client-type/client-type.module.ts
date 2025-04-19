import { Module } from '@nestjs/common';
import { ClientTypeController } from './client-type.controller';
import { ClientTypeService } from './client-type.service';
import { HttpClientsModule } from 'src/http-clients/http-clients.module';

@Module({
  imports: [HttpClientsModule],
  controllers: [ClientTypeController],
  providers: [ClientTypeService]
})
export class ClientTypeModule {}
