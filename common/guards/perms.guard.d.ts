import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
export declare class PermsGuard implements CanActivate {
    private readonly reflector;
    private readonly moduleRef;
    constructor(reflector: Reflector, moduleRef: ModuleRef);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
