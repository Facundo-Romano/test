import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { UsersService } from 'src/resources/users/users.service';
import { User, UserRole } from 'src/resources/users/user.entity';
import { CreateUserDto } from 'src/resources/users/dto/create-user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findByUsername: jest.fn(),
    validatePassword: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  const mockUser: User = {
    id: '6dbd8829-d7fe-4804-9479-000ca032e1a7',
    username: 'user',
    email: 'user@example.com',
    password: 'user123',
    roles: [UserRole.USER],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return an AuthResponse on successful login', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(usersService, 'validatePassword').mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockedAccessToken');

      const result = await authService.login('test@example.com', 'password');

      expect(result).toEqual({
        access_token: 'mockedAccessToken',
        user: {
          id: mockUser.id,
          username: mockUser.username,
          email: mockUser.email,
          roles: mockUser.roles,
        },
      });
      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersService.validatePassword).toHaveBeenCalledWith('password', 'user123');
      expect(jwtService.sign).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(undefined);

      await expect(authService.login('test@example.com', 'password')).rejects.toThrow(
        new NotFoundException('User not found'),
      );

      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersService.validatePassword).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException if password is incorrect', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(usersService, 'validatePassword').mockResolvedValue(false);

      await expect(authService.login('test@example.com', 'wrongpassword')).rejects.toThrow(
        new NotFoundException('Incorrect password'),
      );

      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersService.validatePassword).toHaveBeenCalledWith('wrongpassword', 'user123');
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    const createUserDto: CreateUserDto = {
      username: 'user',
      email: 'user@example.com',
      password: 'user123',
      roles: [UserRole.USER],
    };

    it('should return an AuthResponse on successful register', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(undefined);
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(undefined);
      jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockedAccessToken');

      const result = await authService.register(createUserDto);

      expect(result).toEqual({
        access_token: 'mockedAccessToken',
        user: {
          id: mockUser.id,
          username: mockUser.username,
          email: mockUser.email,
          roles: mockUser.roles,
        },
      });
      expect(usersService.findByUsername).toHaveBeenCalledWith(createUserDto.username);
      expect(usersService.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(jwtService.sign).toHaveBeenCalled();
    });

    it('should throw ConflictException if username already exists', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(mockUser);

      await expect(authService.register(createUserDto)).rejects.toThrow(
        new ConflictException('Username already exists'),
      );

      expect(usersService.findByUsername).toHaveBeenCalledWith(createUserDto.username);
      expect(usersService.findByEmail).not.toHaveBeenCalled();
      expect(usersService.create).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should throw ConflictException if email already exists', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(undefined);
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);

      await expect(authService.register(createUserDto)).rejects.toThrow(
        new ConflictException('Email already exists'),
      );

      expect(usersService.findByUsername).toHaveBeenCalledWith(createUserDto.username);
      expect(usersService.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(usersService.create).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });

  describe('validateToken', () => {
    it('should return user on valid token', async () => {
      const token = 'valid-token';
      jest.spyOn(jwtService, 'verify').mockReturnValue({ sub: mockUser.id });
      jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);

      const result = await authService.validateToken(token);

      expect(result).toEqual(mockUser);
      expect(jwtService.verify).toHaveBeenCalledWith(token);
      expect(usersService.findById).toHaveBeenCalledWith(mockUser.id);
    });

    it('should throw UnauthorizedException on invalid token', async () => {
      const token = 'invalid-token';
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(authService.validateToken(token)).rejects.toThrow(
        new UnauthorizedException('Invalid token'),
      );
      expect(jwtService.verify).toHaveBeenCalledWith(token);
      expect(usersService.findById).not.toHaveBeenCalled();
    });
  });

  /* describe('generateJWT', () => {
    it('should return an AuthResponse with a generated JWT', async () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockedAccessToken');

      const result = await authService.generateJWT(mockUser);

      expect(result).toEqual({
        access_token: 'mockedAccessToken',
        user: {
          id: mockUser.id,
          username: mockUser.username,
          email: mockUser.email,
          roles: mockUser.roles,
        },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: mockUser.username,
        sub: mockUser.id,
        roles: mockUser.roles,
      });
    });
  }); */
});