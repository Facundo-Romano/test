import { ApiProperty } from '@nestjs/swagger';

export class MaritalStatusResponseDto {
  @ApiProperty({ description: 'ID del estado civil', example: 1 })
  estadoCivilId: number;

  @ApiProperty({ description: 'Descripción del estado civil', example: 'C.A.B.A.', required: false })
  estadoCivilDesc?: string;

  @ApiProperty({ description: 'ID del país al que pertenece el estado civil', example: 1 })
  paisId: number;
}