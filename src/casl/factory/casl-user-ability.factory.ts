import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Catch, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import mongoose from "mongoose";
import { UserProduct } from "src/user-product/schemas/user-product.schema";
import { User } from "src/user/schemas/user.schema";
import { UserService } from "src/user/services/user.service";
import { Action } from "../action.enum";

type Subjects = InferSubjects<typeof User | typeof UserProduct> | "all";

export type UserAbility = Ability<[Action, Subjects]>;

@Catch()
@Injectable()
export class CaslUserAbilityFactory {
    constructor(
        @Inject(forwardRef(() => UserService)) private userService: UserService,
    ) { }

    async createForUser(userId: string) {
        const user = await this.userService.findUser({ id: userId });
        if (!user) {
            throw new UnauthorizedException("user not exists or deleted");
        }
        const { can, cannot, build } = new AbilityBuilder<UserAbility>(Ability as AbilityClass<UserAbility>);

        if (user.role === "admin") {
            can(Action.MANAGE, "all");
        }
        else if (user.role === "user") {
            can(Action.MANAGE, User, { _id: user._id });
            can([Action.READ, Action.CREATE], UserProduct, {
                userId: user._id,
            });
        }
        return build({
            detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
        });
    }
}