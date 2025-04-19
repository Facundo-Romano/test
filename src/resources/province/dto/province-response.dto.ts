import { ApiProperty } from '@nestjs/swagger';

export class ProvinceResponseDto {
  @ApiProperty({ description: 'ID de la provincia', example: 1 })
  provinciaId: number;

  @ApiProperty({ description: 'Descripción de la provincia', example: 'Buenos Aires', required: false })
  provinciaDesc?: string;

  @ApiProperty({ description: 'ID del pais al que pertenece la provincia', example: 1 })
  paisId: number;

  @ApiProperty({ description: 'Abreviatura de la provincia', example: 'AR-B', required: false })
  provinciaAbreviatura?: string;

  //PENDIENTE: AVERIGUAR QUE SON ESTOS IDS
  @ApiProperty({ description: 'ID de ?', example: 1, required: false })
  fedpatPciaId?: number;

  @ApiProperty({ description: 'ID de ?', example: 1, required: false })
  galiciaPciaId?: number;

  @ApiProperty({ description: 'ID de ?', example: 1, required: false })
  prudenciaPciaId?: number;
}