import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt-strategy") {
    getRequest(context: ExecutionContext): Promise<any> {
        if (context.getType<GqlContextType>() === "graphql") {
            console.log("graphql")
            const ctx = GqlExecutionContext.create(context);
            return ctx.getContext().req;
        }
        else if (context.getType() === "http") {
            console.log("http")
            const ctx = context.switchToHttp();
            return ctx.getRequest();
        }
        else if (context.getType() === "rpc") {
            console.log("rpc")
            const ctx = context.switchToRpc();
            return ctx.getContext().req;
        }
    }
}