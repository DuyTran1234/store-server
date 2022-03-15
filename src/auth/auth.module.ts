import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { jwtConstant } from "./constants/jwt.constant";
import { AuthController } from "./controllers/auth.controller";
import { AuthResolver } from "./resolvers/auth.resolver";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({
            secret: jwtConstant.secret,
            signOptions: {
                expiresIn: "200s",
            },
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        AuthResolver,
    ],
    controllers: [
        AuthController,
    ],
    exports: [
        AuthService,
        AuthResolver,
    ],
})
export class AuthModule { }