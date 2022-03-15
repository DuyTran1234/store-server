import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ProductRegex } from "../regex/product.regex";

export type ProductDocument = Product & Document;

@Schema({
    timestamps: true,
})
export class Product {
    @Prop({
        required: true,
        validate: ProductRegex.name,
    })
    name: string;

    @Prop({
        required: true,
    })
    price: number;

    @Prop({
        required: true,
    })
    image: string;

    @Prop({
        validate: ProductRegex.description,
    })
    description: string;

    @Prop({
        required: true,
        validate: {
            validator: (value: string) => ProductRegex.type(value), 
        }
    })
    type: string;

    @Prop({
        required: true,
        validate: {
            validator: (value: any) => ProductRegex.quantity(value),
        }
    })
    quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);