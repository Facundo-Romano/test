import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/classes';
import { IvaStatusService } from './iva-status.service';
import { IvaStatusResponseDto } from './dto/iva-status-response.dto';
import { IvaStatus } from './iva-status.entity';

@ApiTags('Iva-Status')
@Controller('iva-status')
export class IvaStatusController {
  constructor(private readonly ivaStatusService: IvaStatusService) {}
  
  @ApiOperation({ summary: 'Obtención de los estatus del iva' })
  @ApiResponse({ status: 200, description: 'Listado de los estatus del iva.', type: [IvaStatusResponseDto] })
  @Get()
  async findAll(): Promise<BaseResponse<IvaStatus[]>> {
    try {
      const ivaStatus = await this.ivaStatusService.findAll();

      return {
        success: true,
        data: ivaStatus
      }
    } catch (error) {
      console.error('Error al buscar tipos de estatus del iva:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al buscar tipos de estatus del iva.');
    }
  }
}
