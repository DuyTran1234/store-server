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
            const listId = products.map((item) => item._id);
            const queries = products.map((item) => {
                return {
                    updateOne: {
                        filter: {
                            _id: new mongoose.Types.ObjectId(item._id),
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
            const deleteProducts = await this.productModel.deleteMany({
                _id: {
                    $in: ids,
                }
            });
            return `the number of products deleted: ${deleteProducts.deletedCount}`;
        } catch (error) {
            throw error;
        }
    }

    async paginationProducts(nDocument: number, nPage: number, propertyStr?: string, orderNum?: number): Promise<any> {
        try {
            const property = propertyStr ? propertyStr : "_id";
            const checkOrder = orderNum ? orderNum : 0;
            const order = checkOrder >= 0 ? 1 : -1;
            const res = await this.productModel.aggregate([
                {
                    $sort: {
                        [property]: order,
                    }
                },
                {
                    $facet: {
                        metadata: [{ $count: "total" }],
                        data: [{ $skip: (nPage - 1) * nDocument }, { $limit: nDocument }],
                        project: [
                            {
                                $project: {
                                    data: 1,
                                    total: { $arrayElemAt: ['$metadata.total', 0] }
                                }
                            }
                        ]
                    },
                },
            ]).allowDiskUse(true);
            const result = res[0].data;
            return result;
        } catch (error) {
            throw error;
        }
    }
}