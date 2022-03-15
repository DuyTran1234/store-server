import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt-strategy") {
    getRequest(context: ExecutionContext): Promise<any> {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}