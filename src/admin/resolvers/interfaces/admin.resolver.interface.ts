import { GetUsersDto } from "src/admin/dto/get-users.dto";
import { PaginationUsersDto } from "src/admin/dto/pagination-users.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";

export interface AdminResolverInterface {

    getListUsers(user: any, getUsers: GetUsersDto): Promise<any>;

    createListUsers(user: any, createUserDtoList: CreateUserDto[]): Promise<any>;

    updateListUsers(updateUsersList: UpdateUserDto[], user: any): Promise<any>;

    deleteUsers(listId: string[], user: any): Promise<any>;

    paginationUsers(user: any, paginationUsersDto: PaginationUsersDto): Promise<any>;
}