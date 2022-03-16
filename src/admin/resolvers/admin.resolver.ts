import { UseGuards, UsePipes } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminAbilityService } from "src/casl/services/admin-ability.service";
import { CurrentUser } from "src/user/custom-decorators/current-user.decorator";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { User } from "src/user/models/user.model";
import { AdminService } from "../services/admin.service";
import { AdminCreateUsersValidation } from "../validations/admin-create-users.validation";
import { AdminGetUsersValidation } from "../validations/admin-get-users.validation";
import { AdminUpdateUsersValidation } from "../validations/admin-update-users.validation";

@Resolver((of) => User)
export class AdminResolver {
    constructor(
        private adminAbility: AdminAbilityService,
        private adminService: AdminService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Query((returns) => [User])
    async getListUsers(@Args({ name: "listId", type: () => [String] }, AdminGetUsersValidation) listId: string[], @CurrentUser() user: any) {
        const checkAbility = await this.adminAbility.adminManage(user.id);
        if (checkAbility) {
            const listUser = await this.adminService.getUsers(listId);
            return listUser;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Mutation((returns) => [User])
    async createListUsers(
        @Args({ name: "createUserList", type: () => [CreateUserDto] }, AdminCreateUsersValidation) createUserDtoList: CreateUserDto[],
        @CurrentUser() user: any) {
        const checkAbility = await this.adminAbility.adminManage(user.id);
        if (checkAbility) {
            const createUsers = await this.adminService.createUsers(createUserDtoList);
            return createUsers;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Mutation((returns) => [User])
    async updateListUsers(
        @Args({name: "updateUsers", type: () => [UpdateUserDto]}, AdminUpdateUsersValidation) updateUsersList: UpdateUserDto[],
        @CurrentUser() user: any
    ): Promise<any> {
       const checkAbility = await this.adminAbility.adminManage(user.id);
       if(checkAbility) {
           const updateUsers = await this.adminService.updateUsers(updateUsersList);
           return updateUsers;
       }
    }

    @UseGuards(JwtAuthGuard)
    @Mutation((returns) => String)
    async deleteUsers(@Args({name: "listId", type: () => [String]}) listId: string[], @CurrentUser() user: any): Promise<any> {
        const checkAbility = await this.adminAbility.adminManage(user.id);
        if(checkAbility) {
            const deleteUsers = await this.adminService.deleteUsers(listId);
            return deleteUsers;
        } 
    }
}