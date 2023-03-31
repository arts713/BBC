import * as React from "react";
import SessionStorageManager from "../../helpers/SessionStorageManager";
import style from "./index.module.scss";
import { IHistoryHandler, PropsKeyboard } from "./types";
import HistoryLinear from "./ui/HistoryLinear";
import HistoryMatrix from "./ui/HistoryMatrix";
import Keyboard from "./ui/Keyboard";
import phoneKepadReducer from "./store/reducer";
import phoneKeypadInitialState, {
    IHistoryItemMatrixState,
    IHistoryLinearState,
} from "./store/initialState";

const sessionStorageManager = new SessionStorageManager();

const MemoKeyboard = React.memo(
    ({
        keyboardData,
        keyHandler,
    }: {
        keyboardData: PropsKeyboard["keyboardData"];
        keyHandler: IHistoryHandler;
    }) => {
        return <Keyboard keyHandler={keyHandler} keyboardData={keyboardData} />;
    },
);

const PhoneKeypad = ({ keyboardData }: PropsKeyboard) => {
    const [state, dispatch] = React.useReducer(
        phoneKepadReducer,
        phoneKeypadInitialState,
    );

    const historyHandler: IHistoryHandler = React.useCallback(
        (label, ox, oy) => {
            dispatch({
                type: "ADD_HISTORY_LINEAR",
                payload: { label },
            });
            dispatch({
                type: "ADD_HISTORY_MATRIX",
                payload: { ox, oy },
            });
        },
        [],
    );

    React.useEffect(() => {
        const historyLinear =
            sessionStorageManager.getItem<IHistoryLinearState>("historyLinear");
        const historyMatrix =
            sessionStorageManager.getItem<IHistoryItemMatrixState>(
                "historyMatrix",
            );

        sessionStorageManager.setItem("historyLinear", historyLinear);
        sessionStorageManager.setItem("historyMatrix", historyMatrix);
    }, []);

    React.useEffect(() => {
        sessionStorageManager.setItem("historyLinear", state.historyLinear);
    }, [state.historyLinear]);

    React.useEffect(() => {
        sessionStorageManager.setItem("historyMatrix", state.historyMatrix);
    }, [state.historyMatrix]);

    return (
        <div className={style.phoneKeypad}>
            <div className={style.phoneKeypad__content}>
                <div className={style.phoneKeypad__keyboardWrapper}>
                    <MemoKeyboard
                        keyHandler={historyHandler}
                        keyboardData={keyboardData}
                    />
                </div>
                <div className={style.phoneKeypad__historyWrapper}>
                    <HistoryLinear history={state.historyLinear} />
                    <HistoryMatrix history={state.historyMatrix} />
                </div>
            </div>
        </div>
    );
};

export default PhoneKeypad;
