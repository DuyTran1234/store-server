import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { ProductRegex } from "../regex/product.regex";

export class CustomQuantityValidation implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return ProductRegex.quantity(value);
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "property quantity only contain integer";
    }
    
}