import { GetUsersDto } from "src/admin/dto/get-users.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { User } from "src/user/schemas/user.schema";

export interface AdminServiceInterface {

    createUsers(users: CreateUserDto[]): Promise<User[]>;

    updateUsers(users: UpdateUserDto[]): Promise<any>;

    getUsers(getUsersDto: GetUsersDto): Promise<User[]>;

    deleteUsers(listId: string[]): Promise<string>;

    paginationUsers(nDocument: number, nPage: number, propertyStr?: string, orderNum?: number): Promise<any>;
    
}