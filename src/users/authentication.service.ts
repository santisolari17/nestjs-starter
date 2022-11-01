import { randomBytes, scryptSync } from 'crypto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) {}

  public async signup(email: string, password: string): Promise<User> {
    await this._checkUserExistenceByEmail(email);
    const hashedPassword = this._hashPassword(password);

    return await this.usersService.create(email, hashedPassword);
  }

  public async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = scryptSync(password, salt, 32);

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    return user;
  }

  private async _checkUserExistenceByEmail(email: string): Promise<void> {
    const users = await this.usersService.find(email);

    if (users.length > 0) {
      throw new BadRequestException('Email already in use');
    }
  }

  private _hashPassword(password: string): string {
    const hashSaltSeparator = '.';
    const keylen = 32;

    const salt = randomBytes(8).toString('hex');
    const hash = scryptSync(password, salt, keylen);

    return salt + hashSaltSeparator + hash.toString('hex');
  }
}
