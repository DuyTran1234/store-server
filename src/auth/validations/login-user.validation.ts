import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { getMessageError } from "src/shared/services/message-error.service";
import { LoginUserDto } from "../dto/login-user.dto";

@Injectable()
export class LoginUserValidation implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        console.log(value);
        const newValue = plainToInstance(LoginUserDto, value);
        const errors = await validate(newValue);
        if(errors.length > 0) {
            const message = await getMessageError(errors[0]);
            throw new BadRequestException(message);
        }
        return value;
    }
}