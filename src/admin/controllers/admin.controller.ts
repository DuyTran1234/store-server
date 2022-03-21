import { Body, Catch, Controller, Delete, Post, Request, UseGuards, UsePipes } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminAbilityService } from "src/casl/services/admin-ability.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { User } from "src/user/schemas/user.schema";
import { AdminService } from "../services/admin.service";
import { AdminCreateUsersValidation } from "../validations/admin-create-users.validation";
import { AdminGetUsersValidation } from "../validations/admin-get-users.validation";
import { AdminUpdateUsersValidation } from "../validations/admin-update-users.validation";

@Catch()
@Controller("admin")
export class AdminController {
    constructor(
        private adminService: AdminService,
        private adminAbilityService: AdminAbilityService,
    ) { }

    @UsePipes(AdminCreateUsersValidation)
    @UseGuards(JwtAuthGuard)
    @Post("create")
    async createUsers(@Body() users: CreateUserDto[], @Request() req): Promise<User[]> {
        const userId = req.user.id;
        const ability = await this.adminAbilityService.adminManage(userId);
        if (ability) {
            const rs = await this.adminService.createUsers(users);
            return rs;
        }
    }

    // @UsePipes(AdminUpdateUsersValidation)
    // @UseGuards(JwtAuthGuard)
    // @Post("update")
    // async updateUsers(@Body() users: UpdateUserDto[], @Request() req): Promise<User[]> {
    //     const userLoginId = req.user.id;
    //     const ability = await this.adminAbilityService.adminManage(userLoginId);
    //     if (ability) {
    //         const rs = await this.adminService.updateUsers(users);
    //         return rs;
    //     }
    // }

    @UsePipes(AdminGetUsersValidation)
    @UseGuards(JwtAuthGuard)
    @Post("get")
    async getUsers(@Body() listId: string[], @Request() req): Promise<User[]> {
        const userLoginId = req.user.id;
        const ability = await this.adminAbilityService.adminManage(userLoginId);
        if (ability) {
            // const rs = await this.adminService.getUsers(listId);
            return null;
        }
    }

    @UsePipes(AdminGetUsersValidation)
    @UseGuards(JwtAuthGuard)
    @Delete("delete")
    async deleteUsers(@Body() listId: string[], @Request() req): Promise<string> {
        const userLoginId = req.user.id;
        const ability = await this.adminAbilityService.adminManage(userLoginId);
        if (ability) {
            const rs = await this.adminService.deleteUsers(listId);
            return rs;
        }
    }
}