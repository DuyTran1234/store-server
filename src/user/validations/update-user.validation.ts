import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateUserDto } from "../dto/update-user.dto";
import { getMessageError } from "src/shared/services/message-error.service";

@Injectable()
export class UpdateUserValidation implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToInstance(UpdateUserDto, value);
        const errors = await validate(obj, {
            skipMissingProperties: true,
        });
        if(errors.length > 0) {
            const message = await getMessageError(errors[0]);
            throw new BadRequestException(`Validation update user failed, ${message}`);
        }
        return value;
    }

}