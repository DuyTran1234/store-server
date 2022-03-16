import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { getMessageError } from "src/shared/services/message-error.service";
import { CreateProductDto } from "../dto/create-product.dto";

@Injectable()
export class CreateProductsValidation implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        if(!Array.isArray(value)) {
            throw new BadRequestException("Validate create products failed, data not an array");
        }
        for(const item of value) {
            const plainObj = plainToInstance(CreateProductDto, item);
            const errors = await validate(plainObj, {
                skipMissingProperties: true,
            });
            if(errors.length > 0) {
                const message = await getMessageError(errors[0]);
                throw new BadRequestException(`validate create products failed, ${message}`);
            }
        }
        return value;
    }
}