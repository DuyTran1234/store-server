import { ArgsType, Field, ID, InputType, Int } from "@nestjs/graphql";
import { Validate } from "class-validator";
import { CustomMethodPaymentValidate } from "../validations/custom-method-payment.validation";

@InputType()
@ArgsType()
export class UpdateUserProductDto {
    @Field()
    _id: string;

    @Field(type => ID, { nullable: true })
    userId: string;

    @Field(type => ID, { nullable: true })
    productId: string;

    @Field(type => Int, { nullable: true })
    quantity: number;

    @Field(type => Int, { nullable: true })
    stateDelivery: number;

    @Field(type => Boolean, { nullable: true })
    isPayment: boolean;

    @Validate(CustomMethodPaymentValidate)
    @Field(type => String, { nullable: true })
    methodPayment: string;
}