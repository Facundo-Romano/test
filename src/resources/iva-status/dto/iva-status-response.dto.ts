import { ApiProperty } from '@nestjs/swagger';

export class IvaStatusResponseDto {
  @ApiProperty({ description: 'ID del estatus del iva', example: 1 })
  situacionIvaId: number;

  @ApiProperty({ description: 'Descripción del estatus del iva', example: 'Consumidor Final' })
  situacionIvaDesc: string;

  @ApiProperty({ description: 'ID del pais al que corresponde el status del iva', example: 1 })
  paisId: number;

  @ApiProperty({ description: 'Abreviación del estatus del iva', example: 'C.F.' })
  situacionIvaAbr: string;
}