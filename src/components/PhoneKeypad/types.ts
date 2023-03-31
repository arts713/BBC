import { IKey, PropsKey } from "./ui/KeyboardButton/types";

export type PropsKeyboard = {
    keyboardData: IKey[][];
};

export type IHistoryHandler = (
    sign: PropsKey["mainSign"],
    ox: PropsKey["ox"],
    oy: PropsKey["oy"],
) => void;
