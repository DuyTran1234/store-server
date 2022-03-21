import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../schemas/product.schema";
import { Model } from "mongoose";
import { CreateProductDto } from "../dto/create-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    async getProducts(ids: string[]): Promise<Product[]> {
        try {
            const getProducts = await this.productModel.find({
                _id: {
                    $in: ids
                }
            }).lean();
            return getProducts;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async createProdcuts(products: CreateProductDto[]): Promise<Product[]> {
        try {
            const create = await this.productModel.insertMany(products);
            return create;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // async updateProducts() {

    // }
}