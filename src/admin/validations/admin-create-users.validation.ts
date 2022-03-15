import { ArgumentMetadata, BadRequestException, Catch, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { getMessageError } from "src/shared/services/message-error.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
@Injectable()
export class AdminCreateUsersValidation implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        if (!Array.isArray(value)) {
            throw new BadRequestException("Validation create users failed, data is not an array");
        }
        for (const item of value) {
            const plainObj = plainToInstance(CreateUserDto, item);
            const errors = await validate(plainObj, {
                whitelist: true,
                forbidNonWhitelisted: true,
                skipMissingProperties: true,
            });
            if (errors.length > 0) {
                const message = await getMessageError(errors[0]);
                throw new BadRequestException(`Validation create user failed, ${message}`);
            }
        }
        return value;
    }
}