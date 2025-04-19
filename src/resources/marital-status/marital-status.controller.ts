import { Controller, Get, InternalServerErrorException, Param } from '@nestjs/common';
import { BaseResponse } from 'src/common/classes';
import { MaritalStatus } from './marital-status.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MaritalStatusService } from './marital-status.service';
import { MaritalStatusResponseDto } from './dto/marital-status-response.dto';

@ApiTags('Marital-Status')
@Controller('marital-status')
export class MaritalStatusController {
  constructor(private readonly maritalStatusService: MaritalStatusService) {}
  
  @ApiOperation({ summary: 'Obtención de los estatus del iva' })
  @ApiResponse({ status: 200, description: 'Listado de los estatus del iva.', type: [MaritalStatusResponseDto] })
  @Get()
  async findAll(): Promise<BaseResponse<MaritalStatus[]>> {
    try {
      const maritalStatuses = await this.maritalStatusService.findAll();

      return {
        success: true,
        data: maritalStatuses
      }
    } catch (error) {
      console.error('Error al buscar estados civiles:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al buscar estados civiles.');
    }
  }

  @ApiOperation({ summary: 'Obtención de estado civil por ID.' })
  @ApiParam({ name: 'id', description: 'ID del estado civil.' })
  @ApiResponse({ status: 200, description: 'Estado Civil', type: MaritalStatusResponseDto })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<BaseResponse<MaritalStatus>> {
      try {
          const maritalStatus = await this.maritalStatusService.findById(id);

          return {
              success: true,
              data: maritalStatus
          }
      } catch (error) {
          console.error('Error al buscar el estado civil:', error);
          throw new InternalServerErrorException('Ocurrió un error inesperado al buscar el estado civil.');
      }
  }
}
