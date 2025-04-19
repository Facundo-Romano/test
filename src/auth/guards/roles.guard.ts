import { Injectable, type CanActivate, type ExecutionContext, ForbiddenException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { ROLES_KEY } from "../decorators/roles.decorator"
import { UserRole } from "src/resources/users/user.entity"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    if (!user || !user.roles) {
      throw new ForbiddenException("User has no roles")
    }

    const hasRole = requiredRoles.some((role) => user.roles.includes(role))

    if (!hasRole) {
      throw new ForbiddenException(`User does not have required role: ${requiredRoles.join(", ")}`)
    }

    return true
  }
}

