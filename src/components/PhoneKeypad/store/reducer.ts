import { Reducer } from "react";
import SessionStorageManager from "../../../helpers/SessionStorageManager";
import { IHistoryItemLinear } from "../ui/HistoryLinear/types";
import { IHistoryItemMatrix } from "../ui/HistoryMatrix/types";
import {
    IHistoryStateMatrix,
    IHistoryStateLinear,
    IState,
} from "./initialState";

type IAction =
    | {
          type: "ADD_HISTORY_LINEAR";
          payload: { label: IHistoryItemLinear["label"] };
      }
    | {
          type: "ADD_HISTORY_MATRIX";
          payload: { ox: IHistoryItemMatrix[0]; oy: IHistoryItemMatrix[1] };
      }
    | {
          type: "UPDATE_HISTORIES";
          payload: {
              historyLinear: IHistoryStateLinear;
              historyMatrix: IHistoryStateMatrix;
          };
      };

const sessionStorageManager = new SessionStorageManager();

const reducer: Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case "ADD_HISTORY_LINEAR": {
            const newState: IState = {
                ...state,
                historyLinear: [
                    {
                        label: action.payload.label,
                        timestamp: new Date().getTime(),
                    },
                    ...state.historyLinear,
                ],
            };

            sessionStorageManager.setItem(
                "historyLinear",
                newState.historyLinear,
            );

            return newState;
        }

        case "ADD_HISTORY_MATRIX": {
            const matrixOX = action.payload.ox + 1;
            const matrixOY = action.payload.oy + 1;

            const newState: IState = {
                ...state,
                historyMatrix: [[matrixOY, matrixOX], ...state.historyMatrix],
            };

            sessionStorageManager.setItem(
                "historyMatrix",
                newState.historyMatrix,
            );

            return newState;
        }

        case "UPDATE_HISTORIES": {
            const historyLinear = action.payload.historyLinear;
            const historyMatrix = action.payload.historyMatrix;

            const newState: IState = {
                historyLinear,
                historyMatrix,
            };

            return newState;
        }

        default:
            return state;
    }
};

export default reducer;
