import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { CaslModule } from "src/casl/casl.module";
import { UserProductResolver } from "./resolvers/user-product.resolver";
import { UserProduct, UserProductSchema } from "./schemas/user-product.schema";
import { UserProductService } from "./services/user-product.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserProduct.name, schema: UserProductSchema },
        ]),
        forwardRef(() => CaslModule),
    ],
    providers: [
        UserProductService,
        UserProductResolver,
    ],
    exports: [
        UserProductService,
        UserProductResolver,
    ],
})
export class UserProductModule { }