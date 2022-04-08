import { UseGuards, UsePipes } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminManageGuard } from "src/casl/guards/admin/admin-manage.guard";
import { AdminAbilityService } from "src/casl/services/admin-ability.service";
import { CurrentUser } from "src/user/custom-decorators/current-user.decorator";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { User } from "src/user/models/user.model";
import { GetUsersDto } from "../dto/get-users.dto";
import { PaginationUsersDto } from "../dto/pagination-users.dto";
import { AdminService } from "../services/admin.service";
import { AdminCreateUsersValidation } from "../validations/admin-create-users.validation";
import { AdminDeleteUsersValidation } from "../validations/admin-delete-users.validation";
import { AdminGetUsersValidation } from "../validations/admin-get-users.validation";
import { AdminUpdateUsersValidation } from "../validations/admin-update-users.validation";
import { AdminResolverInterface } from "./interfaces/admin.resolver.interface";

@Resolver((of) => User)
export class AdminResolver implements AdminResolverInterface {
    constructor(
        private adminAbility: AdminAbilityService,
        private adminService: AdminService,
    ) { }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Query((returns) => [User])
    async getListUsers(
        @CurrentUser() user: any,
        @Args({ name: "getUsersDto", type: () => GetUsersDto }, AdminGetUsersValidation) getUsers: GetUsersDto,
    ) {
        const listUser = await this.adminService.getUsers(getUsers);
        return listUser;
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Mutation((returns) => [User])
    async createListUsers(
        @CurrentUser() user: any,
        @Args({ name: "createUserList", type: () => [CreateUserDto] }, AdminCreateUsersValidation) createUserDtoList: CreateUserDto[]
    ) {
        const createUsers = await this.adminService.createUsers(createUserDtoList);
        return createUsers;
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Mutation((returns) => [User])
    async updateListUsers(
        @Args({ name: "updateUsers", type: () => [UpdateUserDto] }, AdminUpdateUsersValidation) updateUsersList: UpdateUserDto[],
        @CurrentUser() user: any
    ): Promise<any> {
        const checkAbility = await this.adminAbility.adminManage(user.id);
        if (checkAbility) {
            const updateUsers = await this.adminService.updateUsers(updateUsersList);
            return updateUsers;
        }
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Mutation((returns) => String)
    async deleteUsers(
        @Args({ name: "listId", type: () => [String] }, AdminDeleteUsersValidation) listId: string[],
        @CurrentUser() user: any): Promise<any> {
        const checkAbility = await this.adminAbility.adminManage(user.id);
        if (checkAbility) {
            const deleteUsers = await this.adminService.deleteUsers(listId);
            return deleteUsers;
        }
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Mutation((returns) => [User])
    async paginationUsers(
        @CurrentUser() user: any,
        @Args({ name: "paginationUsersDto", type: () => PaginationUsersDto }) paginationUsersDto: PaginationUsersDto,
    ): Promise<any> {
        const checkAbility = await this.adminAbility.adminManage(user.id);
        if (checkAbility) {
            const users = await this.adminService.
                paginationUsers(paginationUsersDto.nDocument, paginationUsersDto.nPage, paginationUsersDto.property, paginationUsersDto.order);
            return users;
        }
    }
}