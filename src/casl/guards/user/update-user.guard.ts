import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserAbilityService } from "src/casl/services/user-ability.service";
import { UserArguments } from "src/user/enum/user-arguments.enum";

@Injectable()
export class UpdateUserGuard implements CanActivate {
    constructor(
        private readonly userAbility: UserAbilityService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        const updateUserId = ctx.getArgs[UserArguments.updateUserDto]._id;
        if (user) {
            return this.userAbility.updateUser(user.id, updateUserId);
        }
        throw new UnauthorizedException("Restricted user");
    }

}