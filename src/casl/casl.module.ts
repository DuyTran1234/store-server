import { forwardRef, Module } from "@nestjs/common";
import { UserProductModule } from "src/user-product/user-product.module";
import { UserModule } from "src/user/user.module";
import { CaslUserAbilityFactory } from "./factory/casl-user-ability.factory";
import { AdminAbilityService } from "./services/admin-ability.service";
import { UserAbilityService } from "./services/user-ability.service";

@Module({
    imports: [
        forwardRef(() => UserModule),
        UserProductModule,
    ],
    providers: [
        CaslUserAbilityFactory,
        UserAbilityService,
        AdminAbilityService,
    ],
    exports: [
        UserAbilityService,
        AdminAbilityService,
    ],
})
export class CaslModule {

}