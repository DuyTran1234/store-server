import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from "mongoose";
import { Product } from "src/product/schemas/product.schema";
import { User } from "src/user/schemas/user.schema";
import { UserProductRegex } from "../regex/user-product.regex";

export type UserProductDocument = UserProduct & Document;

@Schema({
    timestamps: true,
    collection: "user-products"
})
export class UserProduct {
    _id: mongoose.Types.ObjectId;

    @Prop({
        required: true,
        type: mongoose.Types.ObjectId,
        ref: typeof User,
    })
    userId: User;

    @Prop({
        required: true,
        type: mongoose.Types.ObjectId,
        ref: typeof Product,
    })
    productId: Product;

    @Prop({
        required: true,
        validate: async (value: number) => await UserProductRegex.validateQuantity(value),
    })
    quantity: number;

    @Prop({
        required: true,
        transform: async (value: number) => await UserProductRegex.stateDeliveryTransform(value),
    })
    stateDelivery: number;

    @Prop({
        required: true,
    })
    isPayment: boolean;

    @Prop({
        required: true,
        validate: async (value: string) => await UserProductRegex.validateMethodPayment(value),
    })
    methodPayment: string;

    static async getPropertiesNames(): Promise<string[]> {
        return [
            "_id", "userId", "productId", "quantity", "stateDelivery", "isPayment", "methodPayment", "createdAt", "updatedAt"
        ];
    }
}

export const UserProductSchema = SchemaFactory.createForClass(UserProduct);