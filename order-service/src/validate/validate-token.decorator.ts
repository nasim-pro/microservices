// src/common/decorators/protected.decorator.ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ValidateTokenInterceptor } from './validate-jwt-token';


/**
 * Protects the endpoint by validating JWT token
 *
 * Example:
 *   @Post()
 *   @ValidateToken()
 *   create(...) { ... }
 */
export function ValidateToken() {
    return applyDecorators(UseInterceptors(ValidateTokenInterceptor));
}