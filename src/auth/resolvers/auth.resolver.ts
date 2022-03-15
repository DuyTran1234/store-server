import { UsePipes } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { LoginUserDto } from "../dto/login-user.dto";
import { Auth } from "../models/auth.model";
import { AuthService } from "../services/auth.service";
import { LoginUserValidation } from "../validations/login-user.validation";

@Resolver(() => Auth)
export class AuthResolver {
    constructor(
        private authService: AuthService,
    ) { }

    @UsePipes(LoginUserValidation)
    @Query(returns => Auth, { nullable: true })
    async login(@Args() user: LoginUserDto): Promise<any> {
        const validateUser = await this.authService.validateUser(user.username, user.password);
        if(validateUser) {
            return this.authService.signJwt(validateUser);
        }
    }
}