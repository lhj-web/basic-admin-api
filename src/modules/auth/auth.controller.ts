import { Body, Controller, Post, HttpStatus, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserInfoPayload } from './auth.model';
import { HttpProcessor } from '@/common/decorators/http.decorator';
import { TokenResult } from './auth.interface';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpProcessor.handle({ message: 'Login', error: HttpStatus.BAD_REQUEST })
  async login(@Body() body: AuthUserInfoPayload): Promise<TokenResult> {
    const { username, password } = body;
    const res = await this.authService.adminLogin(username, password);
    return res;
  }

  @Get('refreshToken')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle({ message: 'Refresh token' })
  async refreshToken(@Req() req: Request): Promise<any> {
    const { id, username } = req.user as { id: number; username: string };
    const token = this.authService.createToken(id, username);
    return token;
  }
}
