import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";
import { ClientStatus } from "../client.entity";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiProperty({ description: 'Nombre del cliente', example: 'Juan Pérez' })
  @IsString()
  clienteNombre: string;

  @ApiProperty({ description: 'Tipo de cliente ID', example: 1 })
  @IsNumber()
  tipoClienteId: number;

  @ApiProperty({ description: 'Usuario del cliente', example: 'j_perez' })
  @IsString()
  clienteUsuario: string;

  @ApiProperty({ description: 'Contraseña del cliente', example: 'password123' })
  @IsString()
  clientePass: string;

  @ApiProperty({ description: 'Estado del cliente', example: 1 })
  @IsNumber()
  clienteEstado: ClientStatus;

  @ApiProperty({ description: 'CUIT del cliente', example: 20123456789 })
  @IsNumber()
  clienteCuit: number;

  @ApiProperty({ description: 'Tipo de CUIT del cliente', example: 1 })
  @IsNumber()
  clienteTipoCuit: number;

  @ApiProperty({ description: 'Dirección del cliente', example: 'Calle Falsa 123' })
  @IsString()
  clienteDireccion: string;

  @ApiProperty({ description: 'ID del país', example: 1 })
  @IsNumber()
  paisId: number;

  @ApiProperty({ description: 'ID de la provincia', example: 2 })
  @IsNumber()
  provinciaId: number;

  @ApiProperty({ description: 'ID de la localidad', example: 1234 })
  @IsNumber()
  localidadId: number;

  @ApiProperty({ description: 'ID del rol', example: 1 })
  @IsNumber()
  rolId: number;

  @ApiProperty({ description: 'Teléfono del cliente', example: '+5491112345678', minLength: 6 })
  @IsString()
  @MinLength(6)
  clienteTel: string;

  @ApiProperty({ description: 'Correo electrónico del cliente', example: 'juan.perez@example.com' })
  @IsEmail()
  clienteMail: string;
}