import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    const { user } = context.switchToHttp().getRequest();

    // ✅ Allow access to super-admin unconditionally
    if (user?.role === 'super-admin') return true;

    // ❌ If no role metadata is required, allow access
    if (!requiredRoles) return true;

    // 🔐 Normal role check
    return requiredRoles.includes(user?.role);
  }
}
