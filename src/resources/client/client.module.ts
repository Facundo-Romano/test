import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { HttpClientsModule } from 'src/http-clients/http-clients.module';
import { ClientService } from './client.service';

@Module({
  imports: [HttpClientsModule],
  controllers: [ClientController],
    providers: [ClientService],
})
export class ClientModule {}
