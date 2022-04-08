import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { User } from "src/user/schemas/user.schema";

export interface UserServiceInterface {
    createUser(createUserDto: CreateUserDto, isAdmin?: boolean): Promise<User>;

    findUser({ id, username, email, phone }: any): Promise<User>;

    updateUser(updateUserDto: UpdateUserDto, isAdmin?: boolean): Promise<User>;

    deleteUser(id: string): Promise<User>;

    generateRefreshToken(id: string): Promise<User>;

}