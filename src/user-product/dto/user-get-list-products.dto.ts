import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { Validate } from "class-validator";
import { CustomPropertyValidate } from "../validations/custom-input-property.validation";

@InputType()
@ArgsType()
export class UserGetListProductsDto {
    @Field(type => Int)
    nDocument: number;

    @Field(type => Int)
    nPage: number;

    @Field()
    userId: string;

    @Validate(CustomPropertyValidate)
    @Field({ nullable: true })
    propertyStr?: string;

    @Field({ nullable: true })
    orderNum?: number;
}