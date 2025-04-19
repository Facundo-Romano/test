import { Controller, Get, InternalServerErrorException, Param } from '@nestjs/common';
import { Locality } from './locality.entity';
import { BaseResponse } from 'src/common/classes';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalityService } from './locality.service';
import { LocalityResponseDto } from './dto/locality-response.dto';

@ApiTags('Locality')
@Controller('locality')
export class LocalityController {
    constructor(private readonly localityService: LocalityService) {}
  
    @ApiOperation({ summary: 'Obtención de localidades de una provincia.' })
    @ApiParam({ name: 'id', description: 'ID de la provincia a la que pertenecen las localidades.' })
    @ApiResponse({ status: 200, description: 'Localidades', type: [LocalityResponseDto] })
    @Get(':id')
    async findByProvinceId(@Param('id') id: string): Promise<BaseResponse<Locality[]>> {
        try {
            const locality = await this.localityService.findByProvinceId(id);

            return {
                success: true,
                data: locality
            }
        } catch (error) {
            console.error('Error al encontrar las localidades:', error);
            throw new InternalServerErrorException('Ocurrió un error inesperado al encontrar las localidades.');
        }
    }
}
