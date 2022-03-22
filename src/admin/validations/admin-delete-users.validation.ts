import { ArgumentMetadata, BadRequestException, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { GetUsersDto } from "../dto/get-users.dto";
import { AdminGetUsersValidation } from "./admin-get-users.validation";

@Injectable()
export class AdminDeleteUsersValidation extends AdminGetUsersValidation {
    async transform(value: any, metadata: ArgumentMetadata) {
        if (!Array.isArray(value)) {
            throw new BadRequestException(`validate delete users failed, value is not an array`);
        }
        for (const item of value) {
            if (typeof item !== "string") {
                throw new BadRequestException(`validate delete users failed, element ${item} is not a string`);
            }
        }
        return value;
    }
}