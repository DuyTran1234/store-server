import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({
    description: "product model",
})
export class Product {
    @Field({ nullable: true })
    _id: string;

    @Field({ nullable: true })
    name: string;

    @Field((type) => Float, { nullable: true })
    price: number;

    @Field({ nullable: true })
    image: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    type: string;

    @Field((type) => Int, { nullable: true })
    quantity: number;
}