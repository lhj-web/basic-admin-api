import { JwtService } from '@nestjs/jwt';
import { TokenResult } from './auth.interface';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    createToken(id: number, username: string, role: number): TokenResult;
    validateAuthData(payload: any): Promise<any>;
    adminLogin(username: string, password: string): Promise<TokenResult & {
        user_id: number;
    }>;
}
