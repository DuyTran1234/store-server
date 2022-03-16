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
            // const create = products.map(async (item) => {
            //     const createProduct = await new this.productModel(item).save();
            //     return createProduct;
            // });
            // const rs = await Promise.all<Product>(create);
            // return rs;
            // const isDuplicate = products.find(async (item) => {
            //     const findProduct = await this.productModel.findOne({
            //         $or: [
            //             {

            //             }
            //         ]
            //     });
            // });
            const create = await this.productModel.insertMany(products);
            return create;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // async updateProducts() {

    // }
}