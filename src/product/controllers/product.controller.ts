import { Body, Controller, Post, Request, UseGuards, UsePipes } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminAbilityService } from "src/casl/services/admin-ability.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../schemas/product.schema";
import { ProductService } from "../services/product.service";
import { CreateProductsValidation } from "../validations/create-products.validation";

@Controller("product")
export class ProductController {
    constructor(
        private productService: ProductService,
        private adminAbilityService: AdminAbilityService,
    ) {}

    @UsePipes(CreateProductsValidation)
    @UseGuards(JwtAuthGuard)
    @Post("create")
    async createProducts(@Body() products: CreateProductDto[], @Request() req): Promise<Product[]> {
        const userId = req.user.id;
        const ability = await this.adminAbilityService.adminManage(userId);
        if(ability) {
            const rs = await this.productService.createProdcuts(products);
            return rs;
        }
    }
}