import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateLegalEntityClientDto {
  @ApiProperty({ description: 'ID del cliente', example: 1 })
  @IsNumber()
  clienteId: number;

  @ApiProperty({ description: 'Descripción de la persona jurídica', example: 'Empresa X' })
  @IsString()
  nombreEmpresa: string;

  @ApiProperty({ description: 'Domicilio fiscal', example: 'Calle X 1000' })
  @IsString()
  domicilioFiscal: string;

  @ApiProperty({ description: 'ID de la situación del iva', example: 1 })
  @IsNumber()
  situacionIvaId: number;
}