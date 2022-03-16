import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CaslModule } from "src/casl/casl.module";
import { User, UserSchema } from "src/user/schemas/user.schema";
import { UserModule } from "src/user/user.module";
import { AdminController } from "./controllers/admin.controller";
import { AdminResolver } from "./resolvers/admin.resolver";
import { AdminService } from "./services/admin.service";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
        UserModule,
        CaslModule,
    ],
    providers: [
        AdminService,
        AdminResolver,
    ],
    controllers: [
        AdminController,
    ],
    exports: [
        AdminResolver,
    ],
})
export class AdminModule { }