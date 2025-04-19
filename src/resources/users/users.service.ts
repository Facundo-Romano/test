import { Injectable, NotFoundException } from "@nestjs/common"
import { type User, UserRole } from "./user.entity"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import * as bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { FileStorageService } from "src/file-storage/file-storage.service"

@Injectable()
export class UsersService {
  private readonly usersFile = "users"

  constructor(private readonly fileStorageService: FileStorageService) {
    this.initializeUsers()
  }

  private async initializeUsers() {
    const users = await this.fileStorageService.readFile<User>(this.usersFile)

    if (users?.length === 0) {
      // Create an admin user if no users exist
      const adminPassword = await this.hashPassword("admin123")

      await this.fileStorageService.create<User>(this.usersFile, {
        id: uuidv4(),
        username: "admin",
        email: "admin@example.com",
        password: adminPassword,
        roles: [UserRole.ADMIN],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }

  async findAll(): Promise<User[]> {
    return this.fileStorageService.readFile<User>(this.usersFile)
  }

  async findById(id: string): Promise<User> {
    const user = await this.fileStorageService.findById<User>(this.usersFile, id)

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return user
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.fileStorageService.findOne<User>(this.usersFile, { username })
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.fileStorageService.findOne<User>(this.usersFile, { email })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password)

    const newUser: User = {
      id: uuidv4(),
      ...createUserDto,
      password: hashedPassword,
      roles: createUserDto.roles || [UserRole.USER],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return this.fileStorageService.create<User>(this.usersFile, newUser)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id)

    const updatedUser: Partial<User> = {
      ...updateUserDto,
      updatedAt: new Date(),
    }

    if (updateUserDto.password) {
      updatedUser.password = await this.hashPassword(updateUserDto.password)
    }

    const result = await this.fileStorageService.update<User>(this.usersFile, id, updatedUser)

    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return result
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.fileStorageService.delete<User>(this.usersFile, id)

    if (!deleted) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}

