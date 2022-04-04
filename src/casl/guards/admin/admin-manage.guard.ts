import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { AdminAbilityService } from "src/casl/services/admin-ability.service";

@Injectable()
export class AdminManageGuard implements CanActivate {
    constructor(
        private readonly adminAblity: AdminAbilityService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        if (user) {
            const check = await this.adminAblity.adminManage(user.id);
            return check;
        }
        throw new UnauthorizedException();
    }
}