import { Catch, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LazyModuleLoader } from "@nestjs/core";
import { plainToInstance } from "class-transformer";
import { CreateUserProductDto } from "src/user-product/dto/create-user-product.dto";
import { UserProduct } from "src/user-product/schemas/user-product.schema";
import { User } from "src/user/schemas/user.schema";
import { UserService } from "src/user/services/user.service";
import { Action } from "../action.enum";
import { CaslUserAbilityFactory } from "../factory/casl-user-ability.factory";

@Catch()
@Injectable()
export class UserAbilityService {
    constructor(
        private lazyModuleLoader: LazyModuleLoader,
        private userAbilityFactory: CaslUserAbilityFactory,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
    ) { }

    async updateUser(userId: string, updateUserId: string): Promise<boolean> {
        const ability = await this.userAbilityFactory.createForUser(userId);
        const userNeedUpdate = await this.userService.findUser({ id: updateUserId });
        Object.setPrototypeOf(userNeedUpdate, User.prototype);
        if (ability.can(Action.UPDATE, userNeedUpdate)) {
            return true;
        }
        throw new UnauthorizedException("Restricted user");
    }

    async deleteUser(userId: string, deleteUserId: string): Promise<boolean> {
        const ability = await this.userAbilityFactory.createForUser(userId);
        const deleteUser = await this.userService.findUser({ id: deleteUserId });
        Object.setPrototypeOf(deleteUser, User.prototype);
        if (ability.can(Action.DELETE, deleteUser)) {
            return true;
        }
        throw new UnauthorizedException("Restricted user");
    }

    async getUser(userId: string, getUserId: string): Promise<boolean> {
        const ability = await this.userAbilityFactory.createForUser(userId);
        const getUser = await this.userService.findUser({ id: getUserId });
        Object.setPrototypeOf(getUser, User.prototype);
        if (ability.can(Action.READ, getUser)) {
            return true;
        }
        throw new UnauthorizedException("Restricted user");
    }

    async createUserProducts(userId: string, createUserProducts: CreateUserProductDto[]): Promise<boolean> {
        const ability = await this.userAbilityFactory.createForUser(userId);
        const plainArrObj = createUserProducts.map((item) => plainToInstance(UserProduct, item));
        for (const item of plainArrObj) {
            if (!ability.can(Action.CREATE, item)) {
                throw new UnauthorizedException("Restricted user");
            }
        }
        return true;
    }
}