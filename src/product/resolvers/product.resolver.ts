import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminAbilityService } from "src/casl/services/admin-ability.service";
import { CurrentUser } from "src/user/custom-decorators/current-user.decorator";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";
import { CreateProductsValidation } from "../validations/create-products.validation";

@Resolver((of) => Product)
export class ProductResolver {

    constructor(
        private adminAbility: AdminAbilityService,
        private productService: ProductService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Query((returns) => [Product])
    async getProducts(@Args({ name: "listProductId", type: () => [String] }) ids: string[], @CurrentUser() user: any) {
        const checkAbility = await this.adminAbility.adminManage(user.id);
        if(checkAbility) {
            // const getProducts = 
        }
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => [Product])
    async createProducts(
        @Args({ name: "createProductsList", type: () => [CreateProductDto] }, CreateProductsValidation) createProductsList: CreateProductDto[],
        @CurrentUser() user: any,
    ): Promise<any> {
        const checkAbility = await this.adminAbility.adminManage(user.id);
        if (checkAbility) {
            const create = await this.productService.createProdcuts(createProductsList);
            return create;
        }
    }

}