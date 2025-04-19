import { ApiProperty } from '@nestjs/swagger';

export class LocalityResponseDto {
  @ApiProperty({ description: 'ID de la localidad', example: 1 })
  localidadId: number;

  @ApiProperty({ description: 'Descripción de la localidad', example: 'C.A.B.A.', required: false })
  localidadDesc?: string;

  @ApiProperty({ description: 'ID de la provincia a la que corresponde la localidad', example: 1 })
  provinciaId: number;

  @ApiProperty({ description: 'Código postal', example: '1008', required: false })
  codigoPostal?: string;
}