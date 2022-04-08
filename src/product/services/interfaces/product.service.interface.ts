import { CreateProductDto } from "src/product/dto/create-product.dto";
import { UpdateProductDto } from "src/product/dto/update-product.dto";
import { Product } from "src/product/schemas/product.schema";

export interface ProductServiceInterface {
    getProducts(ids: string[]): Promise<Product[]>;

    createProdcuts(products: CreateProductDto[]): Promise<Product[]>;

    updateProducts(products: UpdateProductDto[]): Promise<Product[]>;

    deleteProducts(ids: string[]): Promise<string>;

    paginationProducts(nDocument: number, nPage: number, propertyStr?: string, orderNum?: number): Promise<any>;
}