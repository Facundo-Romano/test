import { ApiProperty } from '@nestjs/swagger';

export class UpdateIndividualClientDto {
  @ApiProperty({ description: 'ID del estado civil', required: false })
  estadoCivilId?: number;

  @ApiProperty({ description: 'ID del sexo', required: false })
  sexoId?: number;

  @ApiProperty({ description: 'Fecha de nacimiento del cliente', required: false })
  clienteFechaNacimiento?: string;

  @ApiProperty({ description: 'Nombre de la empresa', required: false })
  empresa?: string;

  @ApiProperty({ description: 'Domicilio fiscal del cliente', required: false })
  domicilioFiscal?: string;
}