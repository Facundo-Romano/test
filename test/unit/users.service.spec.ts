import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/resources/users/users.service';
import { FileStorageService } from '../../src/file-storage/file-storage.service';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/resources/users/user.entity';

describe('UsersService', () => {
    let usersService: UsersService;
    let fileStorageService: FileStorageService;

    const mockUsers = [
        { id: '1', username: 'user1', email: 'user1@example.com', password: 'hashedPassword1', roles: ['USER'] },
        { id: '2', username: 'user2', email: 'user2@example.com', password: 'hashedPassword2', roles: ['ADMIN'] },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: FileStorageService,
                    useValue: {
                        readFile: jest.fn(),
                        findById: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        fileStorageService = module.get<FileStorageService>(FileStorageService);
    });

    it('should be defined', () => {
        expect(usersService).toBeDefined();
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            jest.spyOn(fileStorageService, 'readFile').mockResolvedValue(mockUsers);
            const result = await usersService.findAll();
            expect(result).toEqual(mockUsers);
            expect(fileStorageService.readFile).toHaveBeenCalledWith(usersService['usersFile']);
        });
    });

    describe('findById', () => {
        it('should return a user by ID', async () => {
            const userId = '1';
            jest.spyOn(fileStorageService, 'findById').mockResolvedValue(mockUsers.find(user => user.id === userId));
            const result = await usersService.findById(userId);
            expect(result).toEqual(mockUsers.find(user => user.id === userId));
            expect(fileStorageService.findById).toHaveBeenCalledWith(usersService['usersFile'], userId);
        });

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(fileStorageService, 'findById').mockResolvedValue(undefined);
            await expect(usersService.findById('3')).rejects.toThrow(NotFoundException);
        });
    });

    describe('findByUsername', () => {
        it('should return a user by username', async () => {
            const username = 'user1';
            jest.spyOn(fileStorageService, 'findOne').mockResolvedValue(mockUsers.find(user => user.username === username));
            const result = await usersService.findByUsername(username);
            expect(result).toEqual(mockUsers.find(user => user.username === username));
            expect(fileStorageService.findOne).toHaveBeenCalledWith(usersService['usersFile'], { username });
        });
    });

    describe('findByEmail', () => {
        it('should return a user by email', async () => {
            const email = 'user1@example.com';
            jest.spyOn(fileStorageService, 'findOne').mockResolvedValue(mockUsers.find(user => user.email === email));
            const result = await usersService.findByEmail(email);
            expect(result).toEqual(mockUsers.find(user => user.email === email));
            expect(fileStorageService.findOne).toHaveBeenCalledWith(usersService['usersFile'], { email });
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const createUserDto = { username: 'newUser', email: 'newUser@example.com', password: 'password' };
            const hashedPassword = 'hashedNewPassword';
            jest.spyOn(usersService as any, 'hashPassword').mockResolvedValue(hashedPassword);
            jest.spyOn(fileStorageService, 'create').mockResolvedValue({ id: '3', ...createUserDto, password: hashedPassword, roles: ['USER'] });
    
            const result = await usersService.create(createUserDto as any);
    
            expect(result).toEqual({ id: '3', ...createUserDto, password: hashedPassword, roles: ['USER'] });
            expect(fileStorageService.create).toHaveBeenCalled();
            expect(usersService['hashPassword']).toHaveBeenCalledWith(createUserDto.password);
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            const userId = '1';
            const updateUserDto = { username: 'updatedUser' };
            jest.spyOn(usersService, 'findById').mockResolvedValue(mockUsers.find(user => user.id === userId) as User);
            jest.spyOn(fileStorageService, 'update').mockResolvedValue({ id: userId, ...mockUsers.find(user => user.id === userId), ...updateUserDto });

            const result = await usersService.update(userId, updateUserDto as any);

            expect(result).toEqual({ id: userId, ...mockUsers.find(user => user.id === userId), ...updateUserDto });
            expect(fileStorageService.update).toHaveBeenCalled();
        });

        it('should throw NotFoundException if user is not found during update', async () => {
            jest.spyOn(usersService, 'findById').mockRejectedValue(new NotFoundException());
            await expect(usersService.update('3', {} as any)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a user', async () => {
            const userId = '1';
            jest.spyOn(fileStorageService, 'delete').mockResolvedValue(true);
            await usersService.remove(userId);
            expect(fileStorageService.delete).toHaveBeenCalledWith(usersService['usersFile'], userId);
        });

        it('should throw NotFoundException if user is not found during remove', async () => {
            jest.spyOn(fileStorageService, 'delete').mockResolvedValue(false);
            await expect(usersService.remove('3')).rejects.toThrow(NotFoundException);
        });
    });
});