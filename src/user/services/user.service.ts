import { BadRequestException, Catch, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { HashDataService } from "src/shared/services/hash-data.service";
import { RandomTokenService } from "src/shared/services/random-token.service";
import { UpdateUserDto } from "../dto/update-user.dto";

@Catch()
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private hashDataService: HashDataService,
    ) { }

    async createUser(createUserDto: CreateUserDto, isAdmin?: boolean): Promise<User> {
        try {
            const findUser = await this.findUser({
                username: createUserDto.username,
                email: createUserDto.email,
                phone: createUserDto.phone,
            });
            if (findUser) {
                throw new BadRequestException("User exists, can't create user");
            }
            createUserDto.password = await this.hashDataService.hashData(createUserDto.password);
            createUserDto.role = isAdmin ? createUserDto.role : "user";
            const create = await new this.userModel(createUserDto).save();
            if (!create) {
                throw new BadRequestException("Create user failed");
            }
            return create;
        } catch (error) {
            throw error;
        }
    }

    async findUser({ id, username, email, phone }: any): Promise<User> {
        const user = await this.userModel.findOne({
            $or: [
                {
                    _id: {
                        $ne: null,
                        $eq: id,
                    }
                },
                {
                    username: {
                        $ne: null,
                        $eq: username,
                    }
                },
                {
                    email: {
                        $ne: null,
                        $eq: email,
                    }
                },
                {
                    phone: {
                        $ne: null,
                        $eq: phone,
                    }
                }
            ],
        }).lean();
        return user;
    }

    async updateUser(updateUserDto: UpdateUserDto, isAdmin?: boolean): Promise<User> {
        updateUserDto.role = isAdmin ? updateUserDto.role : "user";
        updateUserDto.password = updateUserDto.password ? await this.hashDataService.hashData(updateUserDto.password) : undefined;
        const update = await this.userModel.findOneAndUpdate(
            { _id: updateUserDto.id },
            updateUserDto,
            { new: true }
        );
        if (!update) {
            throw new BadRequestException("update user failed");
        }
        return update;
    }

    async deleteUser(id: string): Promise<User> {
        const deleteUser = await this.userModel.findOneAndDelete({
            _id: id,
        }).lean().exec();
        if (deleteUser) {
            return deleteUser;
        }
        throw new BadRequestException(`Delete user: ${id} failed`);
    }

    async generateRefreshToken(id: string): Promise<User> {
        const update = await this.userModel.findOneAndUpdate(
            { _id: id },
            { refreshToken: new RandomTokenService().randomToken() },
            { strict: false, new: true }
        );
        if (!update) {
            throw new BadRequestException("Update refresh token failed");
        }
        return update;
    }

    // async checkDuplicateUpdateUser(updateUserDto: UpdateUserDto, user: User): Promise<boolean> {
    //     for (const property in updateUserDto) {
    //         if (property !== "username" && property !== "password" && property !== "") {
    //             continue;
    //         }
    //         if (user[`${property}`] && updateUserDto[`${property}`] === user[`${property}`]) {
    //             throw new BadRequestException(`property ${property} duplicate`);
    //         }
    //     }
    //     return true;
    // }
}