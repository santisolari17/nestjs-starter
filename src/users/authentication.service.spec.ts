import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { User } from './user.entity';

describe('Authentication service test suite', () => {
  let service: AuthenticationService;
  let UsersServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    UsersServiceMock = {
      find: jest.fn().mockResolvedValue([]),
      create: (email: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersService,
          useValue: UsersServiceMock,
        },
      ],
    }).compile();

    service = module.get(AuthenticationService);
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('abc@a.com', '123');
    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual('123');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    UsersServiceMock.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('asdflkj@asdlfkj.com', 'passdflkj')).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    UsersServiceMock.find = () => Promise.resolve([{ email: 'asdf@asdf.com', password: '123' } as User]);
    await expect(service.signin('laskdjf@alskdfj.com', '123')).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    UsersServiceMock.find = () =>
      Promise.resolve([{ email: 'asdf@asdf.com', password: '212c83a35f72d98b.928b68c1aa9ce8d3287b272f6ad1f35526ce4fd2d39cc387d26430e96acbfef9' } as User]);
    const user = await service.signin('laskdjf@alskdfj.com', '123');

    expect(user).toBeDefined();
  });
});
