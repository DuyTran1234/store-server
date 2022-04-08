import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminManageGuard } from "src/casl/guards/admin/admin-manage.guard";
import { AdminAbilityService } from "src/casl/services/admin-ability.service";
import { CurrentUser } from "src/user/custom-decorators/current-user.decorator";
import { CreateProductDto } from "../dto/create-product.dto";
import { PaginationProductsDto } from "../dto/pagination-products.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";
import { CreateProductsValidation } from "../validations/create-products.validation";
import { ProductResolverInterface } from "./interfaces/product.resolver.interface";

@Resolver((of) => Product)
export class ProductResolver implements ProductResolverInterface {
    constructor(
        private productService: ProductService,
    ) { }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Query((returns) => [Product])
    async getProducts(@CurrentUser() user: any, @Args({ name: "listProductId", type: () => [String] }) ids: string[]) {
        const getProducts = await this.productService.getProducts(ids);
        return getProducts;
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Mutation(returns => [Product])
    async createProducts(
        @CurrentUser() user: any,
        @Args({ name: "createProductsList", type: () => [CreateProductDto] }, CreateProductsValidation) createProductsList: CreateProductDto[],
    ): Promise<any> {
        const create = await this.productService.createProdcuts(createProductsList);
        return create;
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Mutation(returns => [Product])
    async updateProducts(
        @CurrentUser() user: any,
        @Args({ name: "updateProducts", type: () => [UpdateProductDto] }) updateProducts: UpdateProductDto[],
    ): Promise<any> {
        const update = await this.productService.updateProducts(updateProducts);
        return update;
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Mutation(returns => String)
    async deleteProducts(
        @CurrentUser() user: any,
        @Args({ name: "listProductId", type: () => [String], nullable: true }) ids: string[],
    ): Promise<string> {
        const deleteProducts = await this.productService.deleteProducts(ids);
        return deleteProducts;
    }

    @UseGuards(JwtAuthGuard, AdminManageGuard)
    @Mutation(returns => [Product])
    async paginationProduct(
        @CurrentUser() user: any,
        @Args({ name: "paginationProductsDto", type: () => PaginationProductsDto }) paginationProducts: PaginationProductsDto,
    ): Promise<any> {
        const users = await this.productService.
            paginationProducts(paginationProducts.nDocument, paginationProducts.nPage, paginationProducts.property, paginationProducts.order);
        return users;
    }
}