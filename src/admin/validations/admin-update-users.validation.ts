import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { getMessageError } from "src/shared/services/message-error.service";
import { UpdateUserDto } from "src/user/dto/update-user.dto";

@Injectable()
export class AdminUpdateUsersValidation implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        if (!Array.isArray(value)) {
            throw new BadRequestException("Validation update users failed, data is not an array");
        }
        for (const item of value) {
            const plainObj = plainToInstance(UpdateUserDto, item);
            const errors = await validate(plainObj, {
                skipMissingProperties: true,
            });
            if (errors.length > 0) {
                const message = await getMessageError(errors[0]);
                throw new BadRequestException(`Validation update user ${plainObj._id} failed, ${message}`);
            }
        }
        return value;
    }
}