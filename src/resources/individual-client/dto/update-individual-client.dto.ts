import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString } from 'class-validator';

export class UpdateIndividualClientDto {
  @ApiProperty({ description: 'ID del cliente', example: 0 })
  @IsNumber()
  clienteId: number;

  @ApiProperty({ description: 'ID del estado civil', example: 0 })
  @IsNumber()
  estadoCivilId: number;

  @ApiProperty({ description: 'ID del sexo', example: 0 })
  @IsNumber()
  sexoId: number;

  @ApiProperty({ description: 'Fecha de nacimiento del cliente', example: '2025-04-21T13:19:31.742Z' })
  @IsDateString()
  clienteFechaNacimiento: string;

  @ApiProperty({ description: 'Empresa asociada', example: 'string' })
  @IsString()
  empresa: string;

  @ApiProperty({ description: 'Domicilio fiscal', example: 'string' })
  @IsString()
  domicilioFiscal: string;
}