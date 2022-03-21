import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";

@InputType()
@ArgsType()
export class GetUsersDto {
    @Field((type) => [ID], { nullable: true })
    listId?: string[];

    @Field((type) => [String], { nullable: true })
    listUsername?: string[];

    @Field((type) => [String], { nullable: true })
    listEmail?: string[];

    @Field((type) => [String], { nullable: true })
    listPhone?: string[];
}