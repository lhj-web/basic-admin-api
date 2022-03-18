import { AuthService } from './auth.service';
import { AuthUserInfoPayload, ImageCaptchaPayload } from './auth.model';
import { TokenResult } from './auth.interface';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: AuthUserInfoPayload): Promise<TokenResult>;
    refreshToken(req: Request): Promise<any>;
    captcha(size: ImageCaptchaPayload): Promise<{
        img: string;
        id: string;
    }>;
}
