import { Injectable } from "@nestjs/common";
import * as randToken from "rand-token";
export class RandomTokenService {
    randomToken(): string {
        return randToken.generate(30);
    }
}