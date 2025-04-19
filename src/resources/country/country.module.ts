import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { HttpClientsModule } from 'src/http-clients/http-clients.module';

@Module({
  imports: [HttpClientsModule],
  controllers: [CountryController],
  providers: [CountryService]
})
export class CountryModule {}
