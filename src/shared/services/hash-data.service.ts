import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashDataService {
    async hashData(data: string): Promise<string> {
        const saltRounds = 10;
        const encryptData = await bcrypt.hash(data, saltRounds);
        return encryptData;
    }

    async compareData(data: string, encryptData: string): Promise<boolean> {
        const result = await bcrypt.compare(data, encryptData);
        return result;
    }
}