import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AuthResponseDto } from "./dto/auth-response.dto"
import { UsersService } from "src/resources/users/users.service"
import { CreateUserDto } from "src/resources/users/dto/create-user.dto"
import { User } from "src/resources/users/user.entity"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateJWT(user: User): Promise<AuthResponseDto> {
    const payload = { username: user.username, sub: user.id, roles: user.roles }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
    }
  }

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(email)

    if (!user) {
      throw new NotFoundException("User not found")
    }

    if (!await this.usersService.validatePassword(password, user.password)) {
      throw new NotFoundException("Incorrect password")
    }

    return this.generateJWT(user)
  }

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.usersService.findByUsername(createUserDto.username)
    if (existingUser) {
      throw new ConflictException("Username already exists")
    }

    const existingEmail = await this.usersService.findByEmail(createUserDto.email)
    if (existingEmail) {
      throw new ConflictException("Email already exists")
    }

    // Create new user
    const user = await this.usersService.create(createUserDto)

    return this.generateJWT(user)
  }

  async validateToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token)
      const user = await this.usersService.findById(payload.sub)
      return user
    } catch (error) {
      throw new UnauthorizedException("Invalid token")
    }
  }
}

