import { CreateUserProductDto } from "src/user-product/dto/create-user-product.dto";
import { UpdateUserProductDto } from "src/user-product/dto/update-user-product.dto";
import { UserProduct } from "src/user-product/schemas/user-product.schema";

export interface UserProductServiceInterface {
    createUserProducts(createUserProductDto: CreateUserProductDto[]): Promise<UserProduct[]>;

    getUserProductsPaginationByUserId(nDocument: number, nPage: number, userId?: string,
        propertyStr?: string, orderNum?: number): Promise<UserProduct[]>;

    getUserProductById(ids: string[]): Promise<UserProduct[]>;

    updateUserProducts(updateUserProductsDto: UpdateUserProductDto[]): Promise<UserProduct[]>;

    
}