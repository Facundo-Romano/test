import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/classes';
import { SexService } from './sex.service';
import { SexResponseDto } from './dto/sex-response.dto';
import { Sex } from './sex.entity';

@ApiTags('Sex')
@Controller('sex')
export class SexController {
  constructor(private readonly sexService: SexService) {}
  
  @ApiOperation({ summary: 'Obtención de tipos de sexo' })
  @ApiResponse({ status: 200, description: 'Listado de tipos de sexo.', type: [SexResponseDto] })
  @Get()
  async findAll(): Promise<BaseResponse<Sex[]>> {
    try {
      const sexes = await this.sexService.findAll();

      return {
        success: true,
        data: sexes
      }
    } catch (error) {
      console.error('Error al buscar tipos de sexo:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al buscar tipos de sexo.');
    }
  }
}
