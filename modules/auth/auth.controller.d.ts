import { AuthService } from './auth.service';
import { AuthUserInfoPayload } from './auth.model';
import { TokenResult } from './auth.interface';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: AuthUserInfoPayload): Promise<TokenResult>;
    refreshToken(req: Request): Promise<any>;
}
