import { ArgsType, Field } from "@nestjs/graphql";
import { Matches } from "class-validator";
import { UserRegex } from "src/user/regex/user.regex";

@ArgsType()
export class LoginUserDto {
    @Matches(UserRegex.username)
    @Field()
    username: string;

    @Matches(UserRegex.password)
    @Field()
    password: string;
}