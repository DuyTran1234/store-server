import { BadRequestException, Catch, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../schemas/product.schema";
import { Model } from "mongoose";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import mongoose from "mongoose";
@Catch()
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
            }).lean().exec();
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

    async updateProducts(products: UpdateProductDto[]): Promise<Product[]> {
        try {
            const listId = products.map((item) => item.id);
            const queries = products.map((item) => {
                return {
                    updateOne: {
                        filter: {
                            _id: new mongoose.Types.ObjectId(item.id),
                        },
                        update: { ...item },
                    }
                };
            });
            const updateProducts = await this.productModel.bulkWrite(queries)
                .then(async (res) => {
                    const getProducts = await this.getProducts(listId);
                    return getProducts;
                });
            return updateProducts;
        } catch (error) {
            throw error;
        }
    }

    async deleteProducts(ids: string[]): Promise<string> {
        try {
            const deleteProducts = await this.productModel.deleteMany(ids);
            return `the number of products deleted: ${deleteProducts.deletedCount}`;
        } catch (error) {
            throw error;
        }
    }
}