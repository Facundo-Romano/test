import { Controller, Post, Body, Get, HttpCode, HttpStatus } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { Public } from "./decorators/public.decorator"
import { GetUser } from "./decorators/get-user.decorator"
import { LoginDto } from "./dto/login-request.dto"
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthResponseDto } from "./dto/auth-response.dto"
import { CreateUserDto } from "src/resources/users/dto/create-user.dto"
import { User } from "src/resources/users/user.entity"

@ApiTags('auth')
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Logueo de usuario' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Usuario logueado', type: AuthResponseDto })
  @Post('login')
  async login(@Body() { email, password }: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(email, password);
  }

  @Public()
  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado', type: AuthResponseDto })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    return this.authService.register(createUserDto);
  }

  @Get('me')
  getProfile(@GetUser() user: User) {
    const { password, ...result } = user;
    return result;
  }
}

