import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { getMessageError } from "src/shared/services/message-error.service";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class UpdateProductsValidation implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        if (!Array.isArray(value)) {
            throw new BadRequestException("validate update products failed, data not an array");
        }
        for (const item of value) {
            const plainObj = plainToInstance(UpdateProductDto, item);
            const errors = await validate(plainObj, {
                skipMissingProperties: true,
            });
            if (errors.length > 0) {
                const message = await getMessageError(errors[0]);
                throw new BadRequestException(`Validate update products failed, ${message}`);
            }
        }
        return value;
    }

}