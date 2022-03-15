
const types = [
    "clothing",
    "shoes",
    "electric",
    "other",
];

export const ProductRegex = {
    name: /^[\p{L}\s\d]{3,300}$/u,
    description: /^.{0,10000}$/u,
    type: (value: string): boolean => {
        return types.includes(value);
    },
    quantity: (value: number): boolean => {
        return Number.isInteger(value) && value >= 0;
    }
};