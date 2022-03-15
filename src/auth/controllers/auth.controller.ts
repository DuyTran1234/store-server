import { Controller, Post, Request, UseGuards, UsePipes } from "@nestjs/common";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../services/auth.service";
import { LoginUserValidation } from "../validations/login-user.validation";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @UsePipes(LoginUserValidation)
    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req) {
        return this.authService.signJwt(req.user);
    }
}