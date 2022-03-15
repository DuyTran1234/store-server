import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../schemas/product.schema";
import { Model } from "mongoose";
import { CreateProductDto } from "../dto/create-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    async createProdcuts(products: CreateProductDto[]): Promise<Product[]> {
        const create = products.map(async (item) => {
            const createProduct = await new this.productModel(item).save();
            return createProduct;
        });
        const rs = await Promise.all<Product>(create);
        return rs;
    }
}