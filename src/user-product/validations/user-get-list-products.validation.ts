import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { getMessageError } from "src/shared/services/message-error.service";
import { UserGetListProductsDto } from "../dto/user-get-list-products.dto";


@Injectable()
export class UserGetListProductsValidate implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const plainObj = plainToInstance(UserGetListProductsDto, value);
        const errors = await validate(plainObj, {
            skipMissingProperties: true,
        });
        if (errors.length > 0) {
            throw new BadRequestException(`${await getMessageError(errors[0])}`);
        }
        return value;
    }
}