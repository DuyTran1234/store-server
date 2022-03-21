import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("User", {
    description: "User model",
})
export class User {
    @Field((type) => ID)
    _id: string;

    @Field({ nullable: true })
    username: string;

    @Field({ nullable: true })
    password: string;

    @Field({ nullable: true })
    fullname: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    phone: string;

    @Field(type => Date, {
        nullable: true,
    })
    dob: Date;

    @Field({ nullable: true })
    address: string;

    @Field({ nullable: true })
    role: string;

    @Field({ nullable: true })
    refreshToken: string;
}