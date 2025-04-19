import { Controller, Get, Body, Param, Put, Delete, UseGuards } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserRole, type User } from "./user.entity"
import { RolesGuard } from "src/auth/guards/roles.guard"
import { Roles } from "src/auth/decorators/roles.decorator"
import { GetUser } from "src/auth/decorators/get-user.decorator"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll()
    return users.map((user) => {
      const { password, ...result } = user
      return result as User
    })
  }

  @Get('profile')
  async getProfile(@GetUser() user: User) {
    const { password, ...result } = user;
    return result;
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    const { password, ...result } = user;
    return result as User;
  }

  @Put(":id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersService.update(id, updateUserDto)
    const { password, ...result } = user
    return result as User
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}

