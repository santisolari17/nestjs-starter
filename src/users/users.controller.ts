import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  public createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
