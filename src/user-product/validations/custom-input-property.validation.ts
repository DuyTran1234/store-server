import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserProductRegex } from "../regex/user-product.regex";

@ValidatorConstraint({ name: "custom field propertyStr", async: true })
export class CustomPropertyValidate implements ValidatorConstraintInterface {
    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const check = await UserProductRegex.validatePropertyStr(value);
        return check;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `field ${validationArguments.property} data input error`;
    }

}