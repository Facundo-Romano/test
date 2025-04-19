import { ApiProperty } from '@nestjs/swagger';

export class LegalEntityClientResponseDto {
  @ApiProperty({ description: 'ID del cliente', example: 1 })
  clienteId: number;

  @ApiProperty({ description: 'Descripción de la persona jurídica', example: 'Empresa X' })
  nombreEmpresa: string;

  @ApiProperty({ description: 'Domicilio fiscal', example: 'Calle X 1000' })
  domicilioFiscal: string;

  @ApiProperty({ description: 'ID de la situación del iva', example: 1 })
  situacionIvaId: number;
}