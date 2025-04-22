import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchClientDto {
  @ApiProperty({ description: 'Nombre del cliente', example: 'Juan Pérez', required: false })
  @IsString()
  @IsOptional()
  ClienteNombre: string;

  @ApiProperty({ description: 'CUIT del cliente', example: 20123456789, required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  ClienteCuit: number;

  @ApiProperty({ description: 'Número de página', example: 1, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  PageNumber: number;

  @ApiProperty({ description: 'Tamaño de la página', example: 10, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  PageSize: number;

  @ApiProperty({ description: 'Tamaño máximo de la página', example: 50, required: false })
  @IsNumber()
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  MaxPageSize: number;
}