import { JwtService } from '@nestjs/jwt';
import { TokenResult } from './auth.interface';
import { UserService } from '../user/user.service';
import { CacheService } from '@/processors/cache/cache.service';
import { ImageCaptchaPayload } from './auth.model';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly cacheService;
    constructor(jwtService: JwtService, userService: UserService, cacheService: CacheService);
    createToken(id: number, username: string, role: number): TokenResult;
    validateAuthData(payload: any): Promise<any>;
    adminLogin(username: string, password: string): Promise<TokenResult & {
        user_id: number;
    }>;
    getCaptcha(size: ImageCaptchaPayload): Promise<{
        img: string;
        id: string;
    }>;
    checkCaptcha(id: string, code: string): Promise<void>;
}
