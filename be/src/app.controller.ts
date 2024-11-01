import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // FUTURE: serialize/transform models to omit _v and change _id=>id

  @Get('/')
  getAll() {
    return this.appService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.appService.get(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { data: string }) {
    return this.appService.update(id, body.data);
  }

  @Post()
  create(@Body() body: { data: string }) {
    return this.appService.create(body.data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.appService.delete(id);
  }
}
