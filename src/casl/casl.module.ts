import { forwardRef, Module } from "@nestjs/common";
import { UserProductModule } from "src/user-product/user-product.module";
import { UserModule } from "src/user/user.module";
import { CaslUserAbilityFactory } from "./factory/casl-user-ability.factory";
import { AdminAbilityService } from "./services/admin-ability.service";
import { UserAbilityService } from "./services/user-ability.service";
import { UserProductAbilityService } from "./services/user-product-ability.service";

@Module({
    imports: [
        forwardRef(() => UserModule),
        UserProductModule,
    ],
    providers: [
        CaslUserAbilityFactory,
        UserAbilityService,
        AdminAbilityService,
        UserProductAbilityService,
    ],
    exports: [
        UserAbilityService,
        AdminAbilityService,
        UserProductAbilityService,
    ],
})
export class CaslModule {

}