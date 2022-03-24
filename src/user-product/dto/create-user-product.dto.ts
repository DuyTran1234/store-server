import { ArgsType, Field, ID, InputType, Int } from "@nestjs/graphql";
import { IsInt, Validate } from "class-validator";
import mongoose from "mongoose";
import { CustomMethodPaymentValidate } from "../validations/custom-method-payment.validation";

@InputType()
@ArgsType()
export class CreateUserProductDto {
    _id: mongoose.Types.ObjectId;

    @Field(type => ID)
    userId: string;

    @Field(type => ID)
    productId: string;

    @Field(type => Int)
    quantity: number;

    @Field(type => Int)
    stateDelivery: number;

    @Field(type => Boolean)
    isPayment: boolean;

    @Validate(CustomMethodPaymentValidate)
    @Field(type => String)
    methodPayment: string;
}