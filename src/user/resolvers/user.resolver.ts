import { Request, UseGuards, UsePipes } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UserAbilityService } from "src/casl/services/user-ability.service";
import { CurrentUser } from "../custom-decorators/current-user.decorator";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { CreateUserValidation } from "../validations/create-user.validation";
import { UpdateUserValidation } from "../validations/update-user.validation";

@Resolver((of) => User)
export class UserResolver {
    constructor(
        private userService: UserService,
        private userAbility: UserAbilityService,
    ) { }

    // @Args("id") id: string, @Request() request @CurrentUser() user: any
    @Query(returns => User, {nullable: true})
    @UseGuards(JwtAuthGuard)
    async getUser(@Args("id") id: string, @CurrentUser() user: any): Promise<any> {
        const checkAbility = await this.userAbility.getUser(user.id, id);
        if (checkAbility) {
            const getUser = await this.userService.findUser({ id: id });
            return getUser;
        }
    }

    @Query(returns => User, {nullable: true})
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

    @UseGuards(JwtAuthGuard)
    @Mutation((returns) => User)
    async updateUser(@Args(UpdateUserValidation) updateUserDto: UpdateUserDto, @CurrentUser() user: any): Promise<any> {
        const checkAbility = await this.userAbility.updateUser(user.id, updateUserDto._id);
        if (checkAbility) {
            const update = await this.userService.updateUser(updateUserDto) as any;
            const newObj = update.toObject();
            const { password, ...rest } = newObj;
            return rest;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    async deleteUser(@Args("id") id: string, @CurrentUser() user: any): Promise<any> {
        const checkAbility = await this.userAbility.deleteUser(user.id, id);
        if (checkAbility) {
            const deleteUser = await this.userService.deleteUser(id);
            const { password, ...rest } = deleteUser;
            return rest;
        }
    }

}