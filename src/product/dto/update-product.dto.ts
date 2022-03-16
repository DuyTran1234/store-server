import { IsDefined, IsNumber, IsString, Matches, Validate } from "class-validator";
import { ProductRegex } from "../regex/product.regex";
import { ProductQuantityValidation } from "../validations/custom-quantity.validation";
import { ProductTypeValidation } from "../validations/custom-type.validation";

export class UpdateProductDto {
    @IsDefined()
    id: string;

    @Matches(ProductRegex.name)
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;

    @Matches(ProductRegex.description)
    description: string;

    @Validate(ProductTypeValidation)
    type: string;

    @Validate(ProductQuantityValidation)
    quantity: number;
}