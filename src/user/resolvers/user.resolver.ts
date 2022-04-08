import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { DeleteUserGuard } from "src/casl/guards/user/delete-user.guard";
import { GetUserGuard } from "src/casl/guards/user/get-user.guard";
import { UpdateUserGuard } from "src/casl/guards/user/update-user.guard";
import { UserAbilityService } from "src/casl/services/user-ability.service";
import { CurrentUser } from "../custom-decorators/current-user.decorator";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserArguments } from "../enum/user-arguments.enum";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { CreateUserValidation } from "../validations/create-user.validation";
import { UpdateUserValidation } from "../validations/update-user.validation";
import { UserResolverInterface } from "./interfaces/user.resolver.interface";

@Resolver((of) => User)
export class UserResolver implements UserResolverInterface {
    constructor(
        private userService: UserService,
        private userAbility: UserAbilityService,
    ) { }

    @UseGuards(JwtAuthGuard, GetUserGuard)
    @Query(returns => User, { nullable: true })
    async getUser(@CurrentUser() user: any, @Args({ name: UserArguments.getUserId }) id: string
    ): Promise<any> {
        const getUser = await this.userService.findUser({ id: id });
        return getUser;
    }

    @Query(returns => User, { nullable: true })
    async getUserPublic(@Args("id") id: string): Promise<any> {
        const getUserPublic = await this.userService.findUser({ id: id });
        const { password, role, phone, email, refreshToken, dob, address, ...rest } = getUserPublic;
        return rest;
    }

    @Mutation((returns) => User)
    async createUser(@Args(CreateUserValidation) createUserDto: CreateUserDto): Promise<any> {
        const create = await this.userService.createUser(createUserDto);
        return create;
    }

    @UseGuards(JwtAuthGuard, UpdateUserGuard)
    @Mutation((returns) => User)
    async updateUser(
        @CurrentUser() user: any,
        @Args({
            name: UserArguments.updateUserDto,
            type: () => UpdateUserDto,
        }, UpdateUserValidation) updateUserDto: UpdateUserDto
    ): Promise<any> {
        const update = await this.userService.updateUser(updateUserDto) as any;
        const newObj = update.toObject();
        const { password, ...rest } = newObj;
        return rest;
    }

    @UseGuards(JwtAuthGuard, DeleteUserGuard)
    @Mutation((returns) => User)
    async deleteUser(
        @CurrentUser() user: any,
        @Args({ name: UserArguments.deleteUserId }) id: string
    ): Promise<any> {
        const deleteUser = await this.userService.deleteUser(id);
        const { password, ...rest } = deleteUser;
        return rest;
    }

}