import { forwardRef, Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminManageGuard } from "src/casl/guards/admin/admin-manage.guard";
import { CreateUserProductsGuard } from "src/casl/guards/user-product/create-user-products.guard";
import { GetUserProductsByUserIdGuard } from "src/casl/guards/user-product/get-user-products-by-userId.guard";
import { UserAbilityService } from "src/casl/services/user-ability.service";
import { CurrentUser } from "src/user/custom-decorators/current-user.decorator";
import { CreateUserProductDto } from "../dto/create-user-product.dto";
import { UpdateUserProductDto } from "../dto/update-user-product.dto";
import { UserGetListProductsDto } from "../dto/user-get-list-products.dto";
import { ArgumentsNameUserProduct } from "../enum/arguments-name.enum";
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

    @UseGuards(CreateUserProductsGuard)
    @UseGuards(JwtAuthGuard)
    @Mutation(returns => [UserProduct])
    async createUserProducts(
        @CurrentUser() user: any,
        @Args({
            name: ArgumentsNameUserProduct.createUserProductsDto, type: () => [CreateUserProductDto]
        }, CreateUserProductsValidate) createUserProductsDto: CreateUserProductDto[],
    ): Promise<any> {
        try {
            const create = await this.userProductService.createUserProducts(createUserProductsDto);
            return create;
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard, GetUserProductsByUserIdGuard)
    @Query(returns => [UserProduct])
    async getUserProductsByUserId(
        @CurrentUser() user: any,
        @Args({
            name: ArgumentsNameUserProduct.getUserProductPaginationById, type: () => UserGetListProductsDto
        }, UserGetListProductsValidate) input: UserGetListProductsDto,
    ): Promise<any> {
        try {
            const get = await this.userProductService
                .getUserProductsPaginationByUserId(input.nDocument, input.nPage, input.userId, input.propertyStr, input.orderNum);
            return get;
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Query(returns => [UserProduct])
    async getUserProductById(
        @CurrentUser() user: any,
        @Args({ name: ArgumentsNameUserProduct.getUserProductById, type: () => [String] }) ids: string[],
    ): Promise<any> {
        try {
            const getUserProducts = await this.userProductService.getUserProductById(ids);
            return getUserProducts;
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Mutation(returns => [UserProduct])
    async updateUserProducts(
        @CurrentUser() user: any,
        @Args({
            name: ArgumentsNameUserProduct.updateUserProducts,
            type: () => [UpdateUserProductDto]
        }) updateUserProductsDto: UpdateUserProductDto[],
    ): Promise<any> {
        const update = await this.userProductService.updateUserProducts(updateUserProductsDto);
        return update;
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Mutation(returns => String)
    async deleteUserProducts(
        @CurrentUser() user: any,
        @Args({ name: ArgumentsNameUserProduct.deleteUserProductsIds, type: () => [String] }) ids: string[]
    ): Promise<any> {
        const deleteProducts = await this.userProductService.deleteUserProducts(ids);
        return deleteProducts;
    }
}