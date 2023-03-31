import { Reducer } from "react";
import { IHistoryItemLinear } from "../ui/HistoryLinear/types";
import { IHistoryItemMatrix } from "../ui/HistoryMatrix/types";
import { IState } from "./initialState";

type IAction =
    | {
          type: "ADD_HISTORY_LINEAR";
          payload: { label: IHistoryItemLinear["label"] };
      }
    | {
          type: "ADD_HISTORY_MATRIX";
          payload: { ox: IHistoryItemMatrix[0]; oy: IHistoryItemMatrix[1] };
      };

const reducer: Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case "ADD_HISTORY_LINEAR":
            return {
                ...state,
                historyLinear: [
                    {
                        label: action.payload.label,
                        timestamp: new Date().getTime(),
                    },
                    ...state.historyLinear,
                ],
            };

        case "ADD_HISTORY_MATRIX":
            const matrixOX = action.payload.ox + 1;
            const matrixOY = action.payload.oy + 1;
            return {
                ...state,
                historyMatrix: [[matrixOY, matrixOX], ...state.historyMatrix],
            };

        default:
            return state;
    }
};

export default reducer;
