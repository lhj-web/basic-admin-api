import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionOption } from '@/interfaces/http.interface';
export declare class CustomError extends HttpException {
    constructor(options: ExceptionOption, statusCode?: HttpStatus);
}
