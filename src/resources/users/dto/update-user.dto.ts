import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"
import { UserRole } from "../user.entity"

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string

  @IsOptional()
  roles?: UserRole[]
}

