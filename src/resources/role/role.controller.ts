import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/classes';
import { RoleService } from './role.service';
import { RoleResponseDto } from './dto/role-response.dto';
import { Role } from './role.entity';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  
  @ApiOperation({ summary: 'Obtención de roles' })
  @ApiResponse({ status: 200, description: 'Listado de roles.', type: [RoleResponseDto] })
  @Get()
  async findAll(): Promise<BaseResponse<Role[]>> {
    try {
      const roles = await this.roleService.findAll();

      return {
        success: true,
        data: roles
      }
    } catch (error) {
      console.error('Error al buscar los roles:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al buscar los roles.');
    }
  }
}
