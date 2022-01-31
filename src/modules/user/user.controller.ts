import { Body, Controller, Get, Header, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { HttpProcessor } from '@/common/decorators/http.decorator';
import { QueryParams } from '@/common/decorators/query-params.decorator';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { UserService } from './user.service';
import { User, UserInfo } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getInfo')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('Get user Info')
  getUserById(@Req() request: Request) {
    console.log(request.headers.authorization);
  }

  @Post('addUser')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('Add user')
  addUser(@Body() body: User) {
    this.userService.createOne(body);
  }
}
