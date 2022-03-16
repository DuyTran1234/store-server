import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LazyModuleLoader } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { HashDataService } from "src/shared/services/hash-data.service";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class AuthService {
    constructor(
        private lazyModuleLoader: LazyModuleLoader,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        private hashDataService: HashDataService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findUser({
            username: username,
        }) as any;
        if (user) {
            const check = await this.hashDataService.compareData(password, user.password);
            if (check) {
                if(!user.refreshToken) {
                    const generateNewToken = await this.userService.generateRefreshToken(user._id);
                }
                const { password, ...res } = user;
                return res;
            }
        }
        throw new UnauthorizedException("login user failed");
    }

    async signJwt(user: any) {
        const payload = { id: user._id, username: user.username };
        return {
            accessToken: this.jwtService.sign(payload),
        }
    }
}