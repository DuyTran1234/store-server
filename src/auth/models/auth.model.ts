import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("Auth", {
    description: "Auth model",
})
export class Auth {
    @Field({ nullable: true })
    accessToken: string;
}