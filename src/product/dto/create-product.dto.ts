import { IsDefined, Matches, Validate } from "class-validator";
import { ProductRegex } from "../regex/product.regex";
import { CustomQuantityValidation } from "../validations/custom-quantity.validation";
import { CustomTypeValidation } from "../validations/custom-type.validation";

export class CreateProductDto {
    @IsDefined()
    @Matches(ProductRegex.name)
    name: string;

    @IsDefined()
    price: number;

    @IsDefined()
    image: string;

    @Matches(ProductRegex.description)
    description: string;

    @IsDefined()
    @Validate(CustomTypeValidation)
    type: string;

    @IsDefined()
    @Validate(CustomQuantityValidation)
    quantity: number;
}