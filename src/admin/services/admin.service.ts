import { BadRequestException, Catch, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/services/user.service";
import { HashDataService } from "src/shared/services/hash-data.service";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { LazyModuleLoader } from "@nestjs/core";
import { GetUsersDto } from "../dto/get-users.dto";
import mongoose from "mongoose";

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
            const getUsersDto = {
                listUsername: [],
                listPhone: [],
                listEmail: [],
            }
            for (const item of users) {
                getUsersDto.listUsername.push(item.username);
                getUsersDto.listEmail.push(item.email);
                getUsersDto.listPhone.push(item.phone);
            }
            const checkUsers = await this.getUsers(getUsersDto);
            if (checkUsers.length > 0) {
                throw new BadRequestException(`username: ${checkUsers[0].username} exists`);
            }
            const createUsers = await this.userModel.insertMany(users);
            return createUsers;
        } catch (error) {
            throw error;
        }
    }

    async updateUsers(users: UpdateUserDto[]): Promise<any> {
        try {
            const listIdUpdate = users.map((item) => item._id);
            const arrUpdate = users.map((item) => {
                return {
                    updateOne: {
                        filter: { _id: item._id },
                        update: { ...item },
                    }
                }
            });
            const updateUsers = await this.userModel.bulkWrite(arrUpdate)
                .then(async (res) => {
                    const update = await this.getUsers({ listId: listIdUpdate });
                    return update;
                })
            return updateUsers;
        } catch (error) {
            throw error;
        }
    }

    async getUsers(getUsersDto: GetUsersDto): Promise<User[]> {
        try {
            const get = await this.userModel.find({
                $or: [
                    {
                        _id: {
                            $ne: null,
                            $in: getUsersDto.listId ? getUsersDto.listId : [],
                        }
                    },
                    {
                        username: {
                            $ne: null,
                            $in: getUsersDto.listUsername ? getUsersDto.listUsername : [],
                        }
                    },
                    {
                        email: {
                            $ne: null,
                            $in: getUsersDto.listEmail ? getUsersDto.listEmail : [],
                        }
                    },
                    {
                        phone: {
                            $ne: null,
                            $in: getUsersDto.listPhone ? getUsersDto.listPhone : [],
                        }
                    },
                ]
            }).lean().exec();
            return get;
        } catch (error) {
            throw new BadRequestException("get list users failed");
        }
    }

    async deleteUsers(listId: string[]): Promise<string> {
        try {
            const deleteUsers = await this.userModel.deleteMany({
                _id: {
                    $in: listId,
                },
            });
            return `the number of documents deleted: ${deleteUsers.deletedCount}`;
        } catch (error) {
            throw new BadRequestException("delete list users failed");
        }
    }
}