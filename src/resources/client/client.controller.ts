import { Body, Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Client } from './client.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientResponseDto } from './dto/client-response.dto';
import { BaseResponse } from 'src/common/classes';
import { UserRole } from '../users/user.entity';
import { SearchClientDto } from './dto/search-client.dto';
import { SearchClientResponseDto } from './dto/search-client-response.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  
  @ApiOperation({ summary: 'Obtención de clientes' })
  @ApiResponse({ status: 200, description: 'Listado de clientes.', type: [ClientResponseDto] })
  @Get()
  async findAll(): Promise<BaseResponse<Client[]>> {
    try {
      const clients = await this.clientService.findAll();

      return {
        success: true,
        data: clients
      }
    } catch (error) {
      console.error('Error al buscar clientes:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al buscar clientes.');
    }
  }

  @ApiOperation({ summary: 'Buscar cliente por nombre o CUIT' })
  @ApiResponse({ status: 200, description: 'Clientes encontrados.', type: SearchClientResponseDto })
  @Get('search')
  async getByNameOrCuit(@Query() params: SearchClientDto): Promise<BaseResponse<SearchClientResponseDto>> {
    try {
      const response = await this.clientService.getByNameOrCuit(params);

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Error al buscar cliente por nombre o CUIT:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al buscar cliente por nombre o CUIT.');
    }
  }
  
  @ApiOperation({ summary: 'Obtención de cliente por Id' })
  @ApiParam({ name: 'id', description: 'ID del cliente a buscar' })
  @ApiResponse({ status: 200, description: 'Datos del cliente.', type: [ClientResponseDto] })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<BaseResponse<Client>> {
    try {
      const client = await this.clientService.findById(id);

      return {
        success: true,
        data: client
      }
    } catch (error) {
      console.error('Error al encontrar el cliente:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al encontrar el cliente.');
    }
  }

  @ApiOperation({ summary: 'Creación de cliente' })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente.', type: ClientResponseDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createClientDto: CreateClientDto): Promise<BaseResponse<Client>> {
    try {
      const client = await this.clientService.create(createClientDto);

      return {
        success: true,
        data: client
      }
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el cliente.');
    }
  }

  @ApiOperation({ summary: 'Modificación de cliente' })
  @ApiBody({ type: UpdateClientDto })
  @ApiParam({ name: 'id', description: 'ID del cliente a modificar' })
  @ApiResponse({ status: 200, description: 'Cliente modificado exitosamente.', type: ClientResponseDto })
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto): Promise<BaseResponse<null>> {
    try {
      await this.clientService.update(id, updateClientDto);

      return {
        success: true,
        data: null
      }
    } catch (error) {
      console.error('Error al modificar el cliente:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al modificar el cliente.');
    }
  }

  @ApiOperation({ summary: 'Eliminación de cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente a eliminar' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente.'})
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string): Promise<BaseResponse<null>> {
    try {
      await this.clientService.remove(id);

      return {
        success: true,
        data: null
      }
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el cliente.');
    }
  }
}
