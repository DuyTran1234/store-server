import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";

@ObjectType({
    description: "User product model"
})
export class UserProduct {
    @Field(type => ID)
    _id: mongoose.Types.ObjectId;

    @Field(type => ID, { nullable: true })
    userId: mongoose.Types.ObjectId;

    @Field(type => ID, { nullable: true })
    productId: mongoose.Types.ObjectId;

    @Field(type => Int, { nullable: true })
    quantity: number;

    @Field(type => Int, { nullable: true })
    stateDelivery: number;

    @Field(type => Boolean, { nullable: true })
    isPayment: boolean;

    @Field(type => String, { nullable: true })
    methodPayment: boolean;
}