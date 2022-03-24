import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";
import { join } from "path";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { CaslModule } from "./casl/casl.module";
import { ProductModule } from "./product/product.module";
import { SharedModule } from "./shared/shared.module";
import { UserProductModule } from "./user-product/user-product.module";
import { UserResolver } from "./user/resolvers/user.resolver";
import { UserModule } from "./user/user.module";

dotenv.config();
const dbUrl = process.env.DB_URL;
// const userSchemaFilePath = join(process.cwd(), "src", "auto-schemas", "userSchema.gql");
// const authSchemaFilePath = join(process.cwd(), "src", "auto-schemas", "authSchema.gql");
const schemaFilePath = join(process.cwd(), "src", "auto-schemas", "schema.gql");

@Module({
    imports: [
        MongooseModule.forRoot(dbUrl),
        AdminModule,
        UserModule,
        SharedModule,
        CaslModule,
        ProductModule,
        AuthModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: schemaFilePath,
        }),
        UserProductModule,
    ],
    providers: [],
    controllers: [],
})
export class AppModule {

}