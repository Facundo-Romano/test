import { Controller, Get, InternalServerErrorException, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/classes';
import { ProvinceResponseDto } from './dto/province-response.dto';
import { ProvinceService } from './province.service';
import { Province } from './province.entity';

@ApiTags('Province')
@Controller('province')
export class ProvinceController {
    constructor(private readonly provinceService: ProvinceService) {}
  
    @ApiOperation({ summary: 'Obtención de provincias de un país.' })
    @ApiParam({ name: 'id', description: 'ID del país al que pertenecen las provincias.' })
    @ApiResponse({ status: 200, description: 'Provincias', type: [ProvinceResponseDto] })
    @Get(':id')
    async findByCountryId(@Param('id') id: string): Promise<BaseResponse<Province[]>> {
        try {
            const provinces = await this.provinceService.findByCountryId(id);

            return {
                success: true,
                data: provinces
            }
        } catch (error) {
            console.error('Error al encontrar las provincias:', error);
            throw new InternalServerErrorException('Ocurrió un error inesperado al encontrar las provincias.');
        }
    }
}
