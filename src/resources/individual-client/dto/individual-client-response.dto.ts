import { ApiProperty } from '@nestjs/swagger';

export class IndividualClientResponseDto {
  @ApiProperty({ description: 'ID del cliente', example: 0 })
  clienteId: number;

  @ApiProperty({ description: 'ID del estado civil', example: 0 })
  estadoCivilId: number;

  @ApiProperty({ description: 'ID del sexo', example: 0 })
  sexoId: number;

  @ApiProperty({ description: 'Fecha de nacimiento del cliente', example: '2025-04-21T13:19:31.742Z' })
  clienteFechaNacimiento: string;

  @ApiProperty({ description: 'Empresa asociada', example: 'string' })
  empresa: string;

  @ApiProperty({ description: 'Domicilio fiscal', example: 'string' })
  domicilioFiscal: string;
}