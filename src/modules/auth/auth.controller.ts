import { Body, Controller, Post, HttpStatus, Get, Req, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserInfoPayload, ImageCaptchaPayload } from './auth.model';
import { HttpProcessor } from '@/common/decorators/http.decorator';
import { TokenResult } from './auth.interface';
import { Request } from 'express';
import { Authorize } from '@/common/decorators/authorize.decorator';
import { PermissionOptional } from '@/common/decorators/permission-optional.decorator';
import { RequestUser } from '@/interfaces/req-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Authorize()
  @PermissionOptional()
  @HttpProcessor.handle({ message: 'Login', error: HttpStatus.BAD_REQUEST })
  async login(@Body() body: AuthUserInfoPayload): Promise<TokenResult> {
    const { username, password, captchaId, verifyCode } = body;
    await this.authService.checkCaptcha(captchaId, verifyCode);
    const res = await this.authService.adminLogin(username, password);
    return res;
  }

  @Get('refreshToken')
  @PermissionOptional()
  @HttpProcessor.handle({ message: 'Refresh token' })
  async refreshToken(@Req() req: Request): Promise<any> {
    const { id, username, role } = req.user as RequestUser;
    const token = this.authService.createToken(id, username, role);
    return token;
  }

  @Get('captcha/img')
  @Authorize()
  @PermissionOptional()
  @HttpProcessor.handle({
    message: 'Captcha',
    error: HttpStatus.BAD_REQUEST,
    success: HttpStatus.CREATED,
  })
  async captcha(@Query() size: ImageCaptchaPayload) {
    return await this.authService.getCaptcha(size);
  }
}
