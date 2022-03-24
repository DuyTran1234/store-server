import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserProduct, UserProductDocument } from "../schemas/user-product.schema";
import { Model } from "mongoose";
import { CreateUserProductDto } from "../dto/create-user-product.dto";
import { PropertySortEnum } from "../enum/property-sort.enum";

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
            const property = propertyStr ? propertyStr : "_id";
            const checkOrder = orderNum ? orderNum : PropertySortEnum.ZERO;
            const order = checkOrder >= PropertySortEnum.ZERO ? PropertySortEnum.ASCENDING : PropertySortEnum.DESCENDING;
            const res = await this.userProductModel.aggregate([
                { $match: { userId: userId ? userId : null } },
                { $sort: { [property]: order, } },
                {
                    $facet: {
                        metadata: [{ $count: "total" }],
                        data: [{ $skip: (nPage - 1) * nDocument }, { $limit: nDocument }],
                    },
                },
                {
                    $project: {
                        data: true,
                        total: { $arrayElemAt: ['$metadata.total', 0] }
                    }
                }
            ]).allowDiskUse(true);
            const result = res[0]?.data;
            return result;
        } catch (error) {
            throw error;
        }
    }
}