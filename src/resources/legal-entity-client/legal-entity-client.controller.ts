import { Body, Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BaseResponse } from 'src/common/classes';
import { UserRole } from '../users/user.entity';
import { LegalEntityClientResponseDto } from './dto/legal-entity-client-response.dto';
import { LegalEntityClient } from './legal-entity-client.entity';
import { CreateLegalEntityClientDto } from './dto/create-legal-entity-client.dto';
import { UpdateLegalEntityClientDto } from './dto/update-legal-entity-client.dto';
import { LegalEntityClientService } from './legal-entity-client.service';

@ApiTags('Legal-Entity-Client')
@Controller('legal-entity-client')
export class LegalEntityClientController {
  constructor(private readonly legalEntityClientervice: LegalEntityClientService) {}
  
  @ApiOperation({ summary: 'Obtención de persona jurídica por id del cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiResponse({ status: 200, description: 'Datos de la persona jurídica.', type: [LegalEntityClientResponseDto] })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<BaseResponse<LegalEntityClient>> {
    try {
      const legalEntity = await this.legalEntityClientervice.findById(id);

      return {
        success: true,
        data: legalEntity
      }
    } catch (error) {
      console.error('Error al encontrar la persona jurídica:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al encontrar la persona jurídica.');
    }
  }

  @ApiOperation({ summary: 'Creación de persona jurídica' })
  @ApiBody({ type: CreateLegalEntityClientDto })
  @ApiResponse({ status: 201, description: 'Persona jurídica creado exitosamente.', type: LegalEntityClientResponseDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createLegalEntityClientDto: CreateLegalEntityClientDto): Promise<BaseResponse<LegalEntityClient>> {
    console.log("🚀 ~ LegalEntityClientController ~ create ~ createLegalEntityClientDto:", createLegalEntityClientDto)
    try {
      const legalEntity = await this.legalEntityClientervice.create(createLegalEntityClientDto);

      return {
        success: true,
        data: legalEntity
      }
    } catch (error) {
      console.error('Error al crear la persona jurídica:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear la persona jurídica.');
    }
  }

  @ApiOperation({ summary: 'Modificación de la persona jurídica' })
  @ApiBody({ type: UpdateLegalEntityClientDto })
  @ApiParam({ name: 'id', description: 'ID de la persona jurídica a modificar' })
  @ApiResponse({ status: 200, description: 'Persona jurídica modificada exitosamente.', type: LegalEntityClientResponseDto })
  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateLegalEntityClientDto: UpdateLegalEntityClientDto): Promise<BaseResponse<null>> {
    try {
      await this.legalEntityClientervice.update(id, updateLegalEntityClientDto);

      return {
        success: true,
        data: null
      }
    } catch (error) {
      console.error('Error al modificar la persona jurídica:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al modificar la persona jurídica.');
    }
  }

  @ApiOperation({ summary: 'Eliminación de persona jurídica' })
  @ApiParam({ name: 'id', description: 'ID de la persona jurídica a eliminar' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente.'})
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string): Promise<BaseResponse<null>> {
    try {
      await this.legalEntityClientervice.remove(id);

      return {
        success: true,
        data: null
      }
    } catch (error) {
      console.error('Error al eliminar la persona jurídica:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar la persona jurídica.');
    }
  }
}
