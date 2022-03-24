import { Catch, InternalServerErrorException } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from "mongoose";
import { RandomTokenService } from "src/shared/services/random-token.service";
import { UserRegex } from "../regex/user.regex";


export type UserDocument = User & Document;
@Catch()
@Schema({
    timestamps: true,
})
export class User {
    _id: mongoose.Types.ObjectId;

    @Prop({
        required: true,
        validate: UserRegex.username,
        unique: true,
    })
    username: string;

    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        required: true,
        validate: UserRegex.fullname,
    })
    fullname: string;

    @Prop({
        required: true,
        validate: UserRegex.email,
        unique: true,
    })
    email: string;

    @Prop({
        validate: UserRegex.phone,
        unique: true,
    })
    phone: string;

    @Prop()
    dob: Date

    @Prop()
    address: string;

    @Prop({
        required: true,
        validate: UserRegex.role,
    })
    role: string;

    @Prop({
        immutable: true,
        default: () => new RandomTokenService().randomToken(),
    })
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);