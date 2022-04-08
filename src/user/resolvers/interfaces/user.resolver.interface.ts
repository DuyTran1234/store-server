import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";

export interface UserResolverInterface {
    getUser(user: any, id: string): Promise<any>;

    getUserPublic(id: string): Promise<any>;

    createUser(createUserDto: CreateUserDto): Promise<any>;

    updateUser(user: any, updateUserDto: UpdateUserDto): Promise<any>;

    deleteUser(user: any, id: string): Promise<any>
}