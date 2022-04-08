import { CreateProductDto } from "src/product/dto/create-product.dto";
import { PaginationProductsDto } from "src/product/dto/pagination-products.dto";
import { UpdateProductDto } from "src/product/dto/update-product.dto";

export interface ProductResolverInterface {
    getProducts(user: any, ids: string[]): Promise<any>;

    createProducts(user: any, createProductsList: CreateProductDto[],): Promise<any>;

    updateProducts(user: any, updateProducts: UpdateProductDto[]): Promise<any>;

    deleteProducts(user: any, ids: string[]): Promise<string>;

    paginationProduct(user: any, paginationProducts: PaginationProductsDto): Promise<any>;

    
}