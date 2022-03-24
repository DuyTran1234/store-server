import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";

@InputType()
@ArgsType()
export class PaginationUsersDto {
    @Field(type => Int)
    nDocument: number;

    @Field(type => Int)
    nPage: number;

    @Field({ nullable: true })
    property: string;

    @Field(type => Int, { nullable: true })
    order: number;
}