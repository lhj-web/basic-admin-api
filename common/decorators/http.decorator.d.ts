import { HttpStatus } from '@nestjs/common';
import { ResponseMessage } from '@/interfaces/http.interface';
interface HandleOption {
    error?: HttpStatus;
    success?: HttpStatus;
    message: ResponseMessage;
    usePaginate?: boolean;
}
declare type HandleOptionConfig = ResponseMessage | HandleOption;
export declare const error: (message: ResponseMessage, statusCode?: HttpStatus | undefined) => MethodDecorator;
export declare const success: (message: ResponseMessage, statusCode?: HttpStatus | undefined) => MethodDecorator;
export declare function handle(args: HandleOptionConfig): MethodDecorator;
export declare const paginate: () => MethodDecorator;
export declare const HttpProcessor: {
    error: (message: ResponseMessage, statusCode?: HttpStatus | undefined) => MethodDecorator;
    success: (message: ResponseMessage, statusCode?: HttpStatus | undefined) => MethodDecorator;
    handle: typeof handle;
    paginate: () => MethodDecorator;
};
export {};
