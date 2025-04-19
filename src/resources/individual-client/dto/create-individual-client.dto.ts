import { ApiProperty } from '@nestjs/swagger';

export class CreateIndividualClientDto {
  @ApiProperty({ description: 'ID del cliente' })
  clienteId: number;

  @ApiProperty({ description: 'ID del estado civil' })
  estadoCivilId: number;

  @ApiProperty({ description: 'ID del sexo' })
  sexoId: number;

  @ApiProperty({ description: 'Fecha de nacimiento del cliente' })
  clienteFechaNacimiento: string;

  @ApiProperty({ description: 'Nombre de la empresa' })
  empresa: string;

  @ApiProperty({ description: 'Domicilio fiscal del cliente' })
  domicilioFiscal: string;
}