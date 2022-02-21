import { Body, Controller, Get, HttpStatus, Patch, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { HttpProcessor } from '@/common/decorators/http.decorator';
import { UserService } from './user.service';
import { User } from './user.model';
import { PermissionOptional } from '@/common/decorators/permission-optional.decorator';
import { QueryParams } from '@/common/decorators/query-params.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getInfo')
  @PermissionOptional()
  @HttpProcessor.handle('Get user Info')
  async getUserInfo(@Req() req: Request) {
    const { id } = req.user as { id: number };
    const { username, avatar, desc } = await this.userService.findOne({ id });

    return { userId: id, userName: username, portrait: avatar, desc };
  }

  @Post('add')
  @HttpProcessor.handle({
    message: 'Add user',
    success: HttpStatus.CREATED,
    error: HttpStatus.BAD_REQUEST,
  })
  async add(@Body() body: User) {
    const user = await this.userService.findOne({ username: body.username });
    if (user) throw 'The user has existed';
    await this.userService.createOne(body);
    return true;
  }

  @Put('update')
  @HttpProcessor.handle('Update user')
  async update(@Body() body: User) {
    await this.userService.updateOne(body.id, { ...body });
    return true;
  }

  @Get('All')
  @PermissionOptional()
  @HttpProcessor.handle('Get user list')
  async getUserList(@QueryParams() { origin, options }) {
    const { username, status } = origin;
    const query = {};
    if (username) query['username'] = username;
    if (status) query['status'] = !!Number(status);
    const users = await this.userService.getUserList(query, options);
    return users;
  }

  @Patch('forbid')
  @HttpProcessor.handle({
    message: 'Forbid user',
    success: 200,
    error: HttpStatus.BAD_REQUEST,
  })
  async forbidUser(@Body() { id }) {
    const user = await this.userService.findOne({ id });

    if (user.status === true) {
      this.userService.updateOne(id, { status: false });
    } else throw 'The user has been disabled';
  }

  @Patch('enable')
  @HttpProcessor.handle({
    message: 'Enable user',
    success: 200,
    error: HttpStatus.BAD_REQUEST,
  })
  async enableUser(@Body() { id }) {
    const user = await this.userService.findOne({ id });

    if (user.status === false) {
      this.userService.updateOne(id, { status: true });
    } else throw 'The user has been enable';
  }

  @Post('exist')
  @PermissionOptional()
  async exist(@Body() { username }) {
    const isExist = await this.userService.isUserExist(username);
    return isExist;
  }

  @Get(':id')
  @PermissionOptional()
  async getUsername(@QueryParams() { params }) {
    const user = await this.userService.findOne({ id: params.id });
    return { username: user.username };
  }
}
