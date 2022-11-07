/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { SerializeResponseAs } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthenticationService } from './authentication.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthenticationGuard } from '../guards/authentication.guard'
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
@SerializeResponseAs(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
  ) {}

  @Post('/signup')
  public async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authenticationService.signup(body.email, body.password);
    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  public async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authenticationService.signin(body.email, body.password);
    session.userId = user.id;

    return user;
  }

  @Post('/signout')
  public async signout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
  @UseGuards(AuthenticationGuard)
  public async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/:id')
  public async findUser(@Param('id') id: string) {
    console.log('IMMA THA HANDLER!!!');
    return await this.usersService.findOne(Number(id));
  }

  @Get('')
  public async findByEmail(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.usersService.remove(Number(id));
  }

  @Patch('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.update(Number(id), body);
  }
}
