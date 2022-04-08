import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { UserAbilityService } from "src/casl/services/user-ability.service";
import { UserArguments } from "src/user/enum/user-arguments.enum";

@Injectable()
export class GetUserGuard implements CanActivate {
    constructor(
        private userAblilty: UserAbilityService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        const getUserId = ctx.getArgs()[UserArguments.getUserId];
        return this.userAblilty.getUser(user.id, getUserId);
    }

}