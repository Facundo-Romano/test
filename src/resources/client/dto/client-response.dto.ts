import { ApiProperty } from '@nestjs/swagger';

export enum ClientStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}
export class ClientResponseDto {
  @ApiProperty({ description: 'ID del cliente', example: 123 })
  clienteId: number;

  @ApiProperty({ description: 'Nombre del cliente', example: 'Juan Pérez' })
  clienteNombre: string;

  @ApiProperty({ description: 'Tipo de cliente ID', example: 1 })
  tipoClienteId: number;

  @ApiProperty({ description: 'Usuario del cliente', example: 'j_perez' })
  clienteUsuario: string;

  @ApiProperty({ description: 'Contraseña del cliente', example: 'password123' })
  clientePass: string;

  @ApiProperty({ description: 'Estado del cliente', enum: ClientStatus, example: ClientStatus.ACTIVE })
  clienteEstado: ClientStatus;

  @ApiProperty({ description: 'CUIT del cliente', example: 20123456789 })
  clienteCuit: number;

  @ApiProperty({ description: 'Dirección del cliente', example: 'Calle Falsa 123' })
  clienteDireccion: string;

  @ApiProperty({ description: 'ID del país', example: 1 })
  paisId: number;

  @ApiProperty({ description: 'ID de la provincia', example: 2 })
  provinciaId: number;

  @ApiProperty({ description: 'ID de la localidad', example: 1234 })
  localidadId: number;

  @ApiProperty({ description: 'ID del rol', example: 1 })
  rolId: number;

  @ApiProperty({ description: 'Teléfono del cliente', example: '+5491112345678' })
  clienteTel: string;

  @ApiProperty({ description: 'Correo electrónico del cliente', example: 'juan.perez@example.com' })
  clienteMail: string;

  @ApiProperty({ description: 'Fecha de alta', example: '2023-10-27T10:00:00.000Z' })
  fechaAlta: string;

  @ApiProperty({ description: 'Fecha de modificación', example: '2023-10-27T12:30:00.000Z', nullable: true })
  fechaModif: string | null;

  @ApiProperty({ description: 'Fecha de baja', example: '2023-10-27T14:45:00.000Z', nullable: true })
  fechaBaja: string | null;
}