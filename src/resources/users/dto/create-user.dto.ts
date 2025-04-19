import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator"
import { UserRole } from "../user.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nombre del usuario', example: 'John Doe' })
  username: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email del usuario', example: 'example@gmail.com' })
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'Contraseña del usuario', example: '123456' })
  password: string

  @IsArray()
  @IsEnum(UserRole, { each: true })
  @ApiProperty({ description: 'Roles del usuario', example: '["user", "admin"]' })
  roles: UserRole[];
}

