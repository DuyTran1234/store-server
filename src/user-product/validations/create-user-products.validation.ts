import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { getMessageError } from "src/shared/services/message-error.service";
import { CreateUserProductDto } from "../dto/create-user-product.dto";

@Injectable()
export class CreateUserProductsValidate implements PipeTransform {
    async transform(values: any, metadata: ArgumentMetadata) {
        try {
            if (!Array.isArray(values)) {
                throw new BadRequestException(`input value is not an array`);
            }
            for (const item of values) {
                const plainObj = plainToInstance(CreateUserProductDto, item);
                const errors = await validate(plainObj, {
                    skipMissingProperties: true,
                });
                if (errors.length > 0) {
                    throw new BadRequestException(`${await getMessageError(errors[0])}`);
                }
            }
            return values;
        } catch (error) {
            throw error;
        }
    }
}