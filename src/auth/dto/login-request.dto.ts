import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email del usuario', example: 'example@gmail.com' })
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'Contraseña del usuario', example: '123456' })
  password: string
}

