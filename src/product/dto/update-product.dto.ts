import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";
import { IsDefined, IsNumber, IsString, Matches, Validate } from "class-validator";
import { ProductRegex } from "../regex/product.regex";
import { ProductQuantityValidation } from "../validations/custom-quantity.validation";
import { ProductTypeValidation } from "../validations/custom-type.validation";
@InputType()
@ArgsType()
export class UpdateProductDto {
    @Field(type => ID)
    id: string;

    @Field({ nullable: true })
    @Matches(ProductRegex.name)
    name?: string;

    @Field({ nullable: true })
    @IsNumber()
    price?: number;

    @Field({ nullable: true })
    @IsString()
    image?: string;

    @Field({ nullable: true })
    @Matches(ProductRegex.description)
    description?: string;

    @Field({ nullable: true })
    @Validate(ProductTypeValidation)
    type?: string;

    @Field({ nullable: true })
    @Validate(ProductQuantityValidation)
    quantity?: number;
}