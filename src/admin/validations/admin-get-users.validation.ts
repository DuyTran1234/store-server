import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ListStringValidation implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        if(!Array.isArray(value)) {
            throw new BadRequestException("Validation get users failed, data is not an array of strings");
        }
        const check = value.every((item) => typeof item === "string");
        if(!check) {
            throw new BadRequestException("Validation get users failed, data is not an array of strings");
        }
        return value;
    }
    
}