import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/classes';
import { CountryService } from './country.service';
import { CountryResponseDto } from './dto/country-response.dto';
import { Country } from './country.entity';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
  
  @ApiOperation({ summary: 'Obtención de paises' })
  @ApiResponse({ status: 200, description: 'Listado de paises.', type: [CountryResponseDto] })
  @Get()
  async findAll(): Promise<BaseResponse<Country[]>> {
    try {
      const country = await this.countryService.findAll();

      return {
        success: true,
        data: country
      }
    } catch (error) {
      console.error('Error al buscar paises:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al buscar paises.');
    }
  }
}
