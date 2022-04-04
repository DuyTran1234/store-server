import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserAbilityService } from "src/casl/services/user-ability.service";
import { ArgumentsNameUserProduct } from "src/user-product/enum/arguments-name.enum";

@Injectable()
export class CreateUserProductsGuard implements CanActivate {
    constructor(
        private readonly userAbilityService: UserAbilityService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        if (user) {
            const createUserProductsDto = ctx.getArgs()[ArgumentsNameUserProduct.createUserProductsDto];
            const rs = await this.userAbilityService.createUserProducts(user.id, createUserProductsDto);
            return rs;
        }
        throw new UnauthorizedException("Restricted user");
    }

}