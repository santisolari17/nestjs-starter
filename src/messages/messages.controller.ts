import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages(@Query('order') order: string, @Query('limit') limit: number) {
    return `list ordered in ${order} order. limit: ${limit}`;
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
    return 'post';
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return `Queried id: ${id}`;
  }
}
