import { ArgsType, Field } from "@nestjs/graphql";
import { IsDefined, Matches, Validate } from "class-validator";
import { UserRegex } from "../regex/user.regex";
import { CustomDateValidation } from "../validations/custom-date.validation";
@ArgsType()
export class UpdateUserDto {
    @Field()
    id: string;

    @Field({nullable: true})
    @Matches(UserRegex.username)
    username: string;

    @Field({nullable: true})
    @Matches(UserRegex.password)
    password: string;

    @Field({nullable: true})
    @Matches(UserRegex.fullname)
    fullname: string;

    @Field({nullable: true})
    @Matches(UserRegex.email)
    email: string;

    @Field({nullable: true})
    @Matches(UserRegex.phone)
    phone: string;

    @Field({nullable: true})
    @Validate(CustomDateValidation)
    @Matches(UserRegex.dob)
    dob: string;

    @Field({nullable: true})
    @Matches(UserRegex.address)
    address: string;

    @Field({nullable: true})
    @Matches(UserRegex.role)
    role: string;
}