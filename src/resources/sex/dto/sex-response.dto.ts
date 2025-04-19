import { ApiProperty } from '@nestjs/swagger';

export class SexResponseDto {
  @ApiProperty({ description: 'ID del tipo de sexo', example: 1 })
  sexoId: number;

  @ApiProperty({ description: 'Descripción del tipo de sexo', example: 'Masculino' })
  sexoDesc: string;

  @ApiProperty({ description: 'ID del pais al que corresponde el tipo de sexo', example: 1 })
  paisId: number;
}