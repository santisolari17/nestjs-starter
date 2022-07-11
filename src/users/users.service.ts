import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private _repo: Repository<User>) {}

  public async create(email: string, password: string) {
    const user = this._repo.create({ email, password });

    return await this._repo.save(user);
  }

  public async findOne(id: number) {
    return await this._repo.findOneBy({ id });
  }

  public async find(email: string) {
    return await this._repo.find({ where: { email } });
  }

  public async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(
        `User with Id ${id} doesn't exists in the database`,
      );
    }

    Object.assign(user, attrs);

    return await this._repo.save(user);
  }

  public async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(
        `Cannot delete: user with Id ${id} doesn't exists in the database`,
      );
    }

    return this._repo.remove(user);
  }
}
