import { ApiProperty } from '@nestjs/swagger';
import { ClientResponseDto } from './client-response.dto';
import { IsArray, IsBoolean, IsNumber } from 'class-validator';

export class SearchClientResponseDto {
  @ApiProperty({ description: 'Lista de clientes', type: [ClientResponseDto] })
  @IsArray()
  items: ClientResponseDto[];

  @ApiProperty({ description: 'Número de página actual', example: 1 })
  @IsNumber()
  pageNumber: number;

  @ApiProperty({ description: 'Tamaño de la página', example: 10 })
  @IsNumber()
  pageSize: number;

  @ApiProperty({ description: 'Cantidad total de elementos', example: 100 })
  @IsNumber()
  totalCount: number;

  @ApiProperty({ description: 'Cantidad total de páginas', example: 10 })
  @IsNumber()
  totalPages: number;

  @ApiProperty({ description: 'Indica si hay una página anterior', example: true })
  @IsBoolean()
  hasPreviousPage: boolean;

  @ApiProperty({ description: 'Indica si hay una página siguiente', example: true })
  @IsBoolean()
  hasNextPage: boolean;
}