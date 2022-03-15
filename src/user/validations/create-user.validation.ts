import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreateUserDto } from "../dto/create-user.dto";
import { getMessageError } from "../../shared/services/message-error.service";

@Injectable()
export class CreateUserValidation implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToInstance(CreateUserDto, value);
        const errors = await validate(obj, {
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: true,
        });
        if (errors.length > 0) {
            const message = await getMessageError(errors[0]);
            throw new BadRequestException(`Validation create user failed, ${message}`);
        }
        return value;
    }
}