import { ArgsType, Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsDefined, Matches, Validate } from "class-validator";
import { ProductRegex } from "../regex/product.regex";
import { ProductQuantityValidation } from "../validations/custom-quantity.validation";
import { ProductTypeValidation } from "../validations/custom-type.validation";

@InputType()
@ArgsType()
export class CreateProductDto {
    @Field()
    @Matches(ProductRegex.name)
    name: string;

    @Field((type) => Float)
    price: number;

    @Field({ nullable: true })
    image: string;

    @Field({ nullable: true })
    @Matches(ProductRegex.description)
    description: string;

    @Field()
    @Validate(ProductTypeValidation)
    type: string;

    @Field((type) => Int)
    @Validate(ProductQuantityValidation)
    quantity: number;
}