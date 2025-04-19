import { ApiProperty } from '@nestjs/swagger';

export class ClientTypeResponseDto {
  @ApiProperty({ description: 'ID del tipo de cliente', example: 1 })
  tipoClienteId: number;

  @ApiProperty({ description: 'Descripción del tipo del cliente', example: 'Empresas' })
  tipoClienteDesc: string;

  @ApiProperty({ description: 'ID del pais al que corresponde el tipo de cliente', example: 1 })
  paisId: number;
}