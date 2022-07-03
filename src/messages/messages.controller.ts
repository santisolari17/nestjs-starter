import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages(@Query('order') order: string, @Query('limit') limit: number) {
    return `list ordered in ${order} order. limit: ${limit}`;
  }

  @Post()
  createMessage(@Body() body: any) {
    console.log(body);
    return 'post';
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return `Queried id: ${id}`;
  }
}
