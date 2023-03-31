import { IHistoryHandler } from "../../types";
import { ICoordinatesOX, ICoordinatesOY } from "../HistoryMatrix/types";

export type IKey = {
    mainSign: string;
    additionalSigns?: string;
};

export type PropsKey = IKey & {
    ox: ICoordinatesOX;
    oy: ICoordinatesOY;
    keyHandler: IHistoryHandler;
};
