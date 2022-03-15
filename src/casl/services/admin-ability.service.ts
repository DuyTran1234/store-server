import { Catch, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/services/user.service";
import { Action } from "../action.enum";
import { CaslUserAbilityFactory } from "../factory/casl-user-ability.factory";

@Catch()
@Injectable()
export class AdminAbilityService {
    constructor(
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        private userAbilityFactory: CaslUserAbilityFactory,
    ) { }

    async adminManage(userId: string): Promise<boolean> {
        const ability = await this.userAbilityFactory.createForUser(userId);
        if(ability.can(Action.MANAGE, "all")) {
            return true;
        }
        throw new UnauthorizedException();
    }

}