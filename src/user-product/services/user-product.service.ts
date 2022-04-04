import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserProduct, UserProductDocument } from "../schemas/user-product.schema";
import { Model } from "mongoose";
import { CreateUserProductDto } from "../dto/create-user-product.dto";
import { PropertySortEnum } from "../enum/property-sort.enum";
import { PropertyDefault } from "../enum/property-default.enum";
import { UpdateUserProductDto } from "../dto/update-user-product.dto";

@Injectable()
export class UserProductService {
    constructor(
        @InjectModel(UserProduct.name) private readonly userProductModel: Model<UserProductDocument>,
    ) { }

    async createUserProducts(createUserProductDto: CreateUserProductDto[]): Promise<UserProduct[]> {
        try {
            const create = await this.userProductModel.insertMany(createUserProductDto);
            return create;
        } catch (error) {
            throw error;
        }
    }

    async getUserProductsPaginationByUserId(nDocument: number, nPage: number, userId?: string,
        propertyStr?: string, orderNum?: number): Promise<UserProduct[]> {
        try {
            const property = propertyStr ? propertyStr : PropertyDefault.ORDER_USER_PRODUCTS;
            const checkOrder = orderNum ? orderNum : PropertySortEnum.ZERO;
            const order = checkOrder >= PropertySortEnum.ZERO ? PropertySortEnum.ASCENDING : PropertySortEnum.DESCENDING;
            const res = await this.userProductModel.aggregate([
                { $match: { userId: userId ? userId : null } },
                {
                    $facet: {
                        data: [
                            { $skip: (nPage - 1) * nDocument },
                            { $limit: nDocument },
                            { $sort: { [property]: order, } }
                        ],
                    },
                },
                {
                    $project: {
                        data: true,
                    }
                }
            ]).allowDiskUse(true).exec();
            const result = res[0]?.data;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUserProductById(ids: string[]): Promise<UserProduct[]> {
        try {
            const get = await this.userProductModel.find(
                {
                    _id: {
                        $in: ids,
                    }
                }
            ).lean().exec();
            return get;
        } catch (error) {
            throw error;
        }
    }

    async updateUserProducts(updateUserProductsDto: UpdateUserProductDto[]): Promise<UserProduct[]> {
        try {
            const queries = updateUserProductsDto.map((item) => {
                return {
                    updateOne: {
                        filter: {
                            _id: item._id,
                        },
                        update: { ...item },
                    }
                }
            });
            const update = await this.userProductModel.bulkWrite(queries).then(async (value) => {
                const ids = updateUserProductsDto.map(item => item._id);
                const find = await this.getUserProductById(ids);
                return find;
            });
            return update;
        } catch (error) {
            throw error;
        }
    }

    async deleteUserProducts(ids: string[]): Promise<string> {
        try {
            const deleteProducts = await this.userProductModel.deleteMany(ids);
            return `number of products deleted: ${deleteProducts.deletedCount}`;
        } catch (error) {
            throw error;
        }
    }
}