import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { ProductRegex } from "../regex/product.regex";

export class CustomTypeValidation implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return ProductRegex.type(value);
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `property type can't contain value: ${validationArguments.value}`;
    }

}