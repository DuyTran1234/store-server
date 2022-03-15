import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import * as moment from "moment";

@ValidatorConstraint({
    name: "custom-date-validation",
    async: false,
})
export class CustomDateValidation implements ValidatorConstraintInterface {
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return this.isValidDate(value);
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "invalid date";
    }

    isValidDate(value: string) {
        const dob = moment(value, "YYYY-MM-DD");
        const check = dob.isValid();
        const dobNum = dob.valueOf();
        const now = Date.now();
        const entry = new Date("1850-01-01").getMilliseconds();
        if(check && (dobNum > entry || dobNum === entry) && (dobNum < now || dobNum === now)) {
            return true;
        }
        return false;
    }
}