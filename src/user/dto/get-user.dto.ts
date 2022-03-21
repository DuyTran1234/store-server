import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";

@InputType()
@ArgsType()
export class GetUserDto {
    @Field(type => ID, { nullable: true })
    id?: string;

    @Field({ nullable: true })
    username?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    phone?: string;
}