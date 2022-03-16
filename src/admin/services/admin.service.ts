import { BadRequestException, Catch, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/services/user.service";
import { HashDataService } from "src/shared/services/hash-data.service";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { LazyModuleLoader } from "@nestjs/core";

@Catch()
@Injectable()
export class AdminService {
    constructor(
        private lazyModuleLoader: LazyModuleLoader,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private userService: UserService,
        private hashDataService: HashDataService,
    ) { }

    async createUsers(users: CreateUserDto[]): Promise<User[]> {
        try {
            const createUsers = users.map(async (item) => {
                const create = await this.userService.createUser(item, true);
                return create;
            });
            const rs = await Promise.all<User>(createUsers);
            return rs;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async updateUsers(users: UpdateUserDto[]): Promise<User[]> {
        try {
            const updateUsers = users.map(async (item) => {
                const update = await this.userService.updateUser(item, true);
                return update;
            });
            const rs = await Promise.all<User>(updateUsers);
            return rs;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getUsers(listId: string[]): Promise<User[]> {
        try {
            const get = await this.userModel.find({
                _id: {
                    $in: listId,
                }
            });
            return get;
        } catch (error) {
            throw new BadRequestException("get list users failed");
        }
    }

    async deleteUsers(listId: string[]): Promise<any> {
        try {
            const deleteUsers = await this.userModel.deleteMany({
                _id: {
                    $in: listId,
                },
            });
            return deleteUsers;
        } catch (error) {
            throw new BadRequestException("delete users failed");
        }
    }
}