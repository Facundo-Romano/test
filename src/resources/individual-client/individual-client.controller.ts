import { Body, Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BaseResponse } from 'src/common/classes';
import { UserRole } from '../users/user.entity';
import { IndividualClientResponseDto } from './dto/individual-client-response.dto';
import { IndividualClient } from './individual-client.entity';
import { CreateIndividualClientDto } from './dto/create-individual-client.dto';
import { UpdateIndividualClientDto } from './dto/update-individual-client.dto';
import { IndividualClientService } from './individual-client.service';

@ApiTags('Individual-Client')
@Controller('api/ClientesPersona')
export class IndividualClientController {
  constructor(private readonly individualClientService: IndividualClientService) {}

  @ApiOperation({ summary: 'Obtención de cliente individual por id' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiResponse({ status: 200, description: 'Datos del cliente individual.', type: [IndividualClientResponseDto] })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<BaseResponse<IndividualClient>> {
    try {
      const individualClient = await this.individualClientService.findById(id);

      return {
        success: true,
        data: individualClient
      };
    } catch (error) {
      console.error('Error al encontrar el cliente individual:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al encontrar el cliente individual.');
    }
  }

  @ApiOperation({ summary: 'Creación de cliente individual' })
  @ApiBody({ type: CreateIndividualClientDto })
  @ApiResponse({ status: 201, description: 'Cliente individual creado exitosamente.', type: IndividualClientResponseDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createIndividualClientDto: CreateIndividualClientDto): Promise<BaseResponse<IndividualClient>> {
    try {
      const individualClient = await this.individualClientService.create(createIndividualClientDto);

      return {
        success: true,
        data: individualClient
      };
    } catch (error) {
      console.error('Error al crear el cliente individual:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el cliente individual.');
    }
  }

  @ApiOperation({ summary: 'Modificación del cliente individual' })
  @ApiBody({ type: UpdateIndividualClientDto })
  @ApiParam({ name: 'id', description: 'ID del cliente individual a modificar' })
  @ApiResponse({ status: 200, description: 'Cliente individual modificado exitosamente.', type: IndividualClientResponseDto })
  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateIndividualClientDto: UpdateIndividualClientDto): Promise<BaseResponse<null>> {
    try {
      await this.individualClientService.update(id, updateIndividualClientDto);

      return {
        success: true,
        data: null
      };
    } catch (error) {
      console.error('Error al modificar el cliente individual:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al modificar el cliente individual.');
    }
  }

  @ApiOperation({ summary: 'Eliminación de cliente individual' })
  @ApiParam({ name: 'id', description: 'ID del cliente individual a eliminar' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente.'})
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string): Promise<BaseResponse<null>> {
    try {
      await this.individualClientService.remove(id);

      return {
        success: true,
        data: null
      };
    } catch (error) {
      console.error('Error al eliminar el cliente individual:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el cliente individual.');
    }
  }
}
