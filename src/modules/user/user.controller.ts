import { Body, Controller, Get, Header, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { omit } from 'lodash';
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
  async getUserInfo(@Req() req: Request) {
    const { id } = req.user as { id: number };
    const { username, avatar, desc } = await this.userService.findOne({ id });
    return { userId: id, userName: username, portrait: avatar, desc };
  }

  @Post('addUser')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('Add user')
  addUser(@Body() body: User) {
    this.userService.createOne(body);
  }

  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('Get user list')
  async getUserList() {
    const users = await this.userService.getUserList();
    return users.map((item) => {
      const { id, username, desc, avatar, create_at, update_at, status } = item;
      return { id, username, desc, avatar, create_at, update_at, status };
    });
  }
}
