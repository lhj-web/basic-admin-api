import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth, AuthUserInfoPayload } from './auth.model';
import { HttpProcessor } from '@/common/decorators/http.decorator';
import { TokenResult } from './auth.interface';
// import { QueryParams } from '@/decorators/query-params.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpProcessor.handle({ message: 'Login', error: HttpStatus.BAD_REQUEST })
  async login(@Body() body: AuthUserInfoPayload): Promise<TokenResult> {
    const { username, password } = body;
    const token = await this.authService.adminLogin(username, password);
    return token;
  }
}
