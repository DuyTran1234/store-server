import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstant } from "../constants/jwt.constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt-strategy") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstant.secret,
        });
    }

    async validate(payload: any) {
        return {
            id: payload.id,
            username: payload.username,
        };
    }
}