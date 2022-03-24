import { BadRequestException } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserProductRegex } from "../regex/user-product.regex";

@ValidatorConstraint({ name: "customMethodPayment", async: true })
export class CustomMethodPaymentValidate implements ValidatorConstraintInterface {
    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const check = await UserProductRegex.validateMethodPayment(value);
        return check;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `method payment validate failed`;
    }

}