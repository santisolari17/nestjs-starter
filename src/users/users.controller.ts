import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { SerializeResponseAs } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@SerializeResponseAs(UserDto)
export class UsersController {
  constructor(private _usersService: UsersService) {}

  @Post('/signup')
  public async createUser(@Body() body: CreateUserDto) {
    await this._usersService.create(body.email, body.password);
  }

  @Get('/:id')
  public async findUser(@Param('id') id: string) {
    console.log('IMMA THA HANDLER!!!');
    return await this._usersService.findOne(Number(id));
  }

  @Get('')
  public async findByEmail(@Query('email') email: string) {
    return await this._usersService.find(email);
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this._usersService.remove(Number(id));
  }

  @Patch('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this._usersService.update(Number(id), body);
  }
}
