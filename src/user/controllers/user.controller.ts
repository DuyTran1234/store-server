import { Body, Catch, Controller, Delete, forwardRef, Get, Inject, Param, Post, Request, UnauthorizedException, UseGuards, UsePipes } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { AuthService } from "src/auth/services/auth.service";
import { UserAbilityService } from "src/casl/services/user-ability.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { CreateUserValidation } from "../validations/create-user.validation";
import { UpdateUserValidation } from "../validations/update-user.validation";

@Catch()
@Controller("user")
export class UserController {
    constructor(
        private userService: UserService,
        @Inject(forwardRef(() => UserAbilityService)) private userAbilityService: UserAbilityService,
    ) { }

    @Post("create")
    @UsePipes(CreateUserValidation)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const create = await this.userService.createUser(createUserDto);
        return create;
    }


    @UsePipes(UpdateUserValidation)
    @UseGuards(JwtAuthGuard)
    @Post("update")
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req): Promise<User> {
        const userId = req.user.id;
        const checkAbility = await this.userAbilityService.updateUser(userId, updateUserDto._id);
        if (checkAbility) {
            const update = await this.userService.updateUser(updateUserDto);
            return update;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post("get-user/:id")
    async getUser(@Param("id") id: string, @Request() req): Promise<User> {
        const userId = req.user.id;
        const userAbility = await this.userAbilityService.getUser(userId, id);
        if(userAbility) {
            const getUser = await this.userService.findUser({id: id});
            return getUser;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete("delete/:id")
    async deleteUser(@Param("id") id: string, @Request() req): Promise<User> {
        const userId = req.user.id;
        const userAbility = await this.userAbilityService.deleteUser(userId, id);
        if(userAbility) {
            const deleteUser = await this.userService.deleteUser(id);
            return deleteUser;
        }
    }
}