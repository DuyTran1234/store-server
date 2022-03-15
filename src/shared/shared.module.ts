import { Global, Module } from "@nestjs/common";
import { HashDataService } from "./services/hash-data.service";
import { RandomTokenService } from "./services/random-token.service";

@Global()
@Module({
    providers: [
        HashDataService,
    ],
    exports: [
        HashDataService,
    ],
})
export class SharedModule { }