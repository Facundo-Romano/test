import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({ description: 'ID del rol', example: 1 })
  rolId: number;

  @ApiProperty({ description: 'Descripción del rol', example: 'Titular Póliza' })
  rolDesc: string;
}