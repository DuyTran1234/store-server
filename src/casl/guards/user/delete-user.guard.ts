import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { UserAbilityService } from "src/casl/services/user-ability.service";
import { UserArguments } from "src/user/enum/user-arguments.enum";

@Injectable()
export class DeleteUserGuard implements CanActivate {
    constructor(
        private readonly userAbility: UserAbilityService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        const deleteUserId = ctx.getArgs()[UserArguments.deleteUserId];
        return this.userAbility.deleteUser(user.id, deleteUserId);
    }
}