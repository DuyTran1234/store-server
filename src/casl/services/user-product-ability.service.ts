import { Injectable, UnauthorizedException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateUserProductDto } from "src/user-product/dto/create-user-product.dto";
import { UserProduct } from "src/user-product/schemas/user-product.schema";
import { Action } from "../action.enum";
import { CaslUserAbilityFactory } from "../factory/casl-user-ability.factory";

@Injectable()
export class UserProductAbilityService {
    constructor(
        private userAbilityFactory: CaslUserAbilityFactory,
    ) { }
    async createUserProducts(userId: string, createUserProducts: CreateUserProductDto[]): Promise<boolean> {
        const ability = await this.userAbilityFactory.createForUser(userId);
        const plainArrObj = createUserProducts.map((item) => plainToInstance(UserProduct, item));
        for (const item of plainArrObj) {
            if (!ability.can(Action.CREATE, item)) {
                throw new UnauthorizedException("Restricted user");
            }
        }
        return true;
    }
}