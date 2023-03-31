import { IHistoryItemLinear } from "../ui/HistoryLinear/types";
import { IHistoryItemMatrix } from "../ui/HistoryMatrix/types";

export type IHistoryStateLinear = IHistoryItemLinear[];
export type IHistoryStateMatrix = IHistoryItemMatrix[];

export type IState = {
    historyLinear: IHistoryStateLinear;
    historyMatrix: IHistoryStateMatrix;
};
const initialState: IState = {
    historyLinear: [],
    historyMatrix: [],
};

export default initialState;
