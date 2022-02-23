import { UnauthorizedException } from '@nestjs/common';
import { ResponseMessage } from '@/interfaces/http.interface';
export declare class HttpUnauthorizedError extends UnauthorizedException {
    constructor(message?: ResponseMessage, error?: any);
}
