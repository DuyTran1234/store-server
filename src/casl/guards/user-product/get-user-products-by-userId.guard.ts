import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { plainToInstance } from "class-transformer";
import { UserGetListProductsDto } from "src/user-product/dto/user-get-list-products.dto";
import { ArgumentsNameUserProduct } from "src/user-product/enum/arguments-name.enum";
import { UserAbilityService } from "../../services/user-ability.service";

@Injectable()
export class GetUserProductsByUserIdGuard implements CanActivate {
    constructor(
        private readonly userAbilityService: UserAbilityService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        if (user) {
            const getUser = plainToInstance(UserGetListProductsDto, ctx.getArgs()[ArgumentsNameUserProduct.getUserProductPaginationById]);
            const rs = await this.userAbilityService.getUser(user.id, getUser.userId);
            return rs;
        }
        throw new UnauthorizedException("Restricted user");
    }

}