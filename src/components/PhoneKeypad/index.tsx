import * as React from "react";
import SessionStorageManager from "../../helpers/SessionStorageManager";
import style from "./index.module.scss";
import { IHistoryHandler, PropsKeyboard } from "./types";
import HistoryLinear from "./ui/HistoryLinear";
import HistoryMatrix from "./ui/HistoryMatrix";
import Keyboard from "./ui/Keyboard";
import phoneKepadReducer from "./store/reducer";
import phoneKeypadInitialState, {
    IHistoryStateMatrix,
    IHistoryStateLinear,
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
            sessionStorageManager.getItem<IHistoryStateLinear>("historyLinear");
        const historyMatrix =
            sessionStorageManager.getItem<IHistoryStateMatrix>("historyMatrix");

        // Update
        dispatch({
            type: "UPDATE_HISTORIES",
            payload: {
                historyLinear: historyLinear || [],
                historyMatrix: historyMatrix || [],
            },
        });
    }, []);

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
