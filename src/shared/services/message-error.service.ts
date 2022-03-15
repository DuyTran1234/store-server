import { ValidationError } from "class-validator";

export const getMessageError = async (error: ValidationError): Promise<string> => {
    const messages = Object.values(error.constraints);
    return messages[0];
}