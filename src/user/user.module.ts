import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { CaslModule } from "src/casl/casl.module";
import { UserController } from "./controllers/user.controller";
import { UserResolver } from "./resolvers/user.resolver";
import { User, UserSchema } from "./schemas/user.schema";
import { UserService } from "./services/user.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
        forwardRef(() => AuthModule),
        forwardRef(() => CaslModule),
    ],
    providers: [
        UserResolver,
        UserService,
    ],
    controllers: [
        UserController,
    ],
    exports: [
        UserResolver,
        UserService,
    ],
})
export class UserModule {

}