import { IHistoryItemLinear } from "../ui/HistoryLinear/types";
import { IHistoryItemMatrix } from "../ui/HistoryMatrix/types";

export type IHistoryLinearState = IHistoryItemLinear[];
export type IHistoryItemMatrixState = IHistoryItemMatrix[];

export type IState = {
    historyLinear: IHistoryLinearState;
    historyMatrix: IHistoryItemMatrixState;
};
const initialState: IState = {
    historyLinear: [],
    historyMatrix: [],
};

export default initialState;
