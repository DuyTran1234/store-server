import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CaslModule } from "src/casl/casl.module";
import { ProductController } from "./controllers/product.controller";
import { ProductResolver } from "./resolvers/product.resolver";
import { Product, ProductSchema } from "./schemas/product.schema";
import { ProductService } from "./services/product.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
        ]),
        CaslModule,
    ],
    controllers: [
        ProductController,
    ],
    providers: [
        ProductService,
        ProductResolver,
    ],
    exports: [
        ProductService,
        ProductResolver,
    ],
})
export class ProductModule {

}