import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientTypeService } from './client-type.service';
import { BaseResponse } from 'src/common/classes';
import { ClientTypeResponseDto } from './dto/client-type-response.dto';
import { ClientType } from './client-type.entity';

@ApiTags('Client-Type')
@Controller('client-type')
export class ClientTypeController {
  constructor(private readonly clientTypeService: ClientTypeService) {}
  
  @ApiOperation({ summary: 'Obtención de tipos de clientes' })
  @ApiResponse({ status: 200, description: 'Listado de tipos de clientes.', type: [ClientTypeResponseDto] })
  @Get()
  async findAll(): Promise<BaseResponse<ClientType[]>> {
    try {
      const clientTypes = await this.clientTypeService.findAll();

      return {
        success: true,
        data: clientTypes
      }
    } catch (error) {
      console.error('Error al buscar tipos de clientes:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al buscar tipos de clientes.');
    }
  }
}
