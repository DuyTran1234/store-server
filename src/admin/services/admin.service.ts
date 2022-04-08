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
import { AdminServiceInterface } from "./interfaces/admin.service.interface";

@Injectable()
export class AdminService implements AdminServiceInterface {
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

    async paginationUsers(nDocument: number, nPage: number, propertyStr?: string, orderNum?: number): Promise<any> {
        try {
            const property = propertyStr ? propertyStr : "_id";
            const checkOrder = orderNum ? orderNum : 0;
            const order = checkOrder >= 0 ? 1 : -1;
            const res = await this.userModel.aggregate([
                {
                    $sort: {
                        [property]: order,
                    }
                },
                {
                    $facet: {
                        metadata: [{ $count: "total" }],
                        data: [{ $skip: (nPage - 1) * nDocument }, { $limit: nDocument }],
                        project: [
                            {
                                $project: {
                                    data: 1,
                                    total: { $arrayElemAt: ['$metadata.total', 0] }
                                }
                            }
                        ]
                    },
                },
            ]).allowDiskUse(true);
            const result = res[0]?.data;
            return result;
        } catch (error) {
            throw error;
        }
    }
}