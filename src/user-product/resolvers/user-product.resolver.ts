import { forwardRef, Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UserAbilityService } from "src/casl/services/user-ability.service";
import { CurrentUser } from "src/user/custom-decorators/current-user.decorator";
import { CreateUserProductDto } from "../dto/create-user-product.dto";
import { UserGetListProducts } from "../dto/user-get-list-products.dto";
import { UserProduct } from "../models/user-product.model";
import { UserProductService } from "../services/user-product.service";
import { CreateUserProductsValidate } from "../validations/create-user-products.validation";
import { UserGetListProductsValidate } from "../validations/user-get-list-products.validation";

@Resolver(of => UserProduct)
export class UserProductResolver {
    constructor(
        private userProductService: UserProductService,
        @Inject(forwardRef(() => UserAbilityService)) private userAbilityService: UserAbilityService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => [UserProduct])
    async createUserProducts(
        @CurrentUser() user: any,
        @Args({ name: "createUserProductsDto", type: () => [CreateUserProductDto] }, CreateUserProductsValidate) createUserProductsDto: CreateUserProductDto[],
    ): Promise<any> {
        try {
            const userAbility = await this.userAbilityService.createUserProducts(user.id, createUserProductsDto);
            if (userAbility) {
                const create = await this.userProductService.createUserProducts(createUserProductsDto);
                return create;
            }
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => [UserProduct])
    async getUserProductsById(
        @CurrentUser() user: any,
        @Args({ name: "getUserProductPaginationById", type: () => UserGetListProducts }, UserGetListProductsValidate) input: UserGetListProducts
    ): Promise<any> {
        try {
            const userAbility = await this.userAbilityService.getUser(user.id, input.userId);
            if (userAbility) {
                const get = await this.userProductService
                    .getUserProductsPaginationByUserId(input.nDocument, input.nPage, input.userId, input.propertyStr, input.orderNum);
                return get;
            }
        } catch (error) {
            throw error;
        }
    }
}