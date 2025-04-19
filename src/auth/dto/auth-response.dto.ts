import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "src/resources/users/user.entity"

export interface AuthUserDto {
    id: string
    username: string
    email: string
    roles: UserRole[]
}

export class AuthResponseDto {
    @ApiProperty({ description: 'Token de acceso', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    access_token: string

    @ApiProperty({ description: 'Usuario', example: { id: '123e4567-e89b-12d3-a456-426614174000', username: 'John Doe', email: 'example@gmail.com', roles: ['user', 'admin'] } })
    user: AuthUserDto
} 