import { Catch, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { User } from "src/user/schemas/user.schema";
import { UserService } from "src/user/services/user.service";
import { Action } from "../action.enum";
import { CaslUserAbilityFactory } from "../factory/casl-user-ability.factory";

@Catch()
@Injectable()
export class UserAbilityService {
    constructor(
        private userAbilityFactory: CaslUserAbilityFactory,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
    ) { }

    async updateUser(userId: string, updateUserId: string): Promise<boolean> {
        const ability = await this.userAbilityFactory.createForUser(userId);
        const userNeedUpdate = await this.userService.findUser({ id: updateUserId });
        const plainObj = plainToInstance(User, userNeedUpdate);
        if(ability.can(Action.UPDATE, plainObj)) {
            return true;
        }
        throw new UnauthorizedException("Restricted user");
    }
    
    async deleteUser(userId: string, deleteUserId: string): Promise<boolean> {
        const ability = await this.userAbilityFactory.createForUser(userId);
        const deleteUser = await this.userService.findUser({ id: deleteUserId });
        const plainObj = plainToInstance(User, deleteUser);
        if(ability.can(Action.DELETE, plainObj)) {
            return true;
        }
        throw new UnauthorizedException("Restricted user");
    }

    async getUser(userId: string, getUserId: string): Promise<boolean> {
        const ability = await this.userAbilityFactory.createForUser(userId);
        const getUser = await this.userService.findUser({ id: getUserId });
        const plainObj = plainToInstance(User, getUser);
        if(ability.can(Action.READ, plainObj)) {
            return true;
        }
        throw new UnauthorizedException("Restricted user");
    }
}