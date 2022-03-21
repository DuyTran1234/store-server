import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { GetUsersDto } from "../dto/get-users.dto";
@Injectable()
export class AdminGetUsersValidation implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const newValue = plainToInstance(GetUsersDto, value);
        for (const property in newValue) {
            if (newValue[`${property}`] && !Array.isArray(newValue[`${property}`])) {
                throw new BadRequestException(`Validation get users failed, property ${property} is not an array of string`);
            }
        }
        return value;
    }

}