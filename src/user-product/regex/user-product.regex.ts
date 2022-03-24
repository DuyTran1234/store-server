import { StateDeliveryEnum } from "../enum/state-delivery.enum";
import { $enum } from "ts-enum-util";
import { MethodPaymentEnum } from "../enum/method-payment.enum";
import { UserProduct } from "../schemas/user-product.schema";

export const UserProductRegex = {
    validateQuantity: async (value: number): Promise<boolean> => {
        return Number.isInteger(value) && value > 0;
    },
    stateDeliveryTransform: async (value: number): Promise<number> => {
        if (value > 0) {
            return StateDeliveryEnum.SUCCESS;
        }
        else if (value < 0) {
            return StateDeliveryEnum.FAIL;
        }
        return StateDeliveryEnum.WAIT;
    },
    validateMethodPayment: async (value: string): Promise<boolean> => {
        const methods = $enum(MethodPaymentEnum).getValues();
        const check = methods.find((item) => item === value);
        return check ? true : false;
    },
    validatePropertyStr: async (value: string): Promise<boolean> => {
        const properties = await UserProduct.getPropertiesNames();
        const find = properties.find(item => item === value);
        return find ? true : false;
    }
}