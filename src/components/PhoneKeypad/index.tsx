import * as React from "react";
import SessionStorageManager from "../../helpers/SessionStorageManager";
import style from "./index.module.scss";
import { PropsKeyboard } from "./types";
import HistoryLinear from "./ui/HistoryLinear";
import { IHistoryItemLinear } from "./ui/HistoryLinear/types";
import HistoryMatrix from "./ui/HistoryMatrix";
import { IHistoryItemMatrix } from "./ui/HistoryMatrix/types";
import Keyboard from "./ui/Keyboard";
import { PropsKey } from "./ui/KeyboardButton/types";

const PhoneKeypad = ({ keyboardData }: PropsKeyboard) => {
    const [historyLinear, setHistoryLinear] = React.useState<
        IHistoryItemLinear[] | []
    >([]);
    const [historyMatrix, setHistoryMatrix] = React.useState<
        IHistoryItemMatrix[] | []
    >([]);

    const historyHandler = (
        label: PropsKey["mainSign"],
        ox: PropsKey["ox"],
        oy: PropsKey["oy"],
    ): void => {
        historyLinearHandler(label);
        historyMatrixHandler(ox, oy);
    };

    const historyMatrixHandler = (
        ox: PropsKey["ox"],
        oy: PropsKey["oy"],
    ): void => {
        const matrixOX = ox + 1;
        const matrixOY = oy + 1;

        const sessionStorageManager = new SessionStorageManager();
        sessionStorageManager.setItem("historyMatrix", [
            [matrixOY, matrixOX],
            ...historyMatrix,
        ]);
        setHistoryMatrix([[matrixOY, matrixOX], ...historyMatrix]);
    };

    const historyLinearHandler = (label: PropsKey["mainSign"]): void => {
        const currentHistoryItem: IHistoryItemLinear = {
            label,
            timestamp: new Date().getTime(),
        };

        const sessionStorageManager = new SessionStorageManager();
        sessionStorageManager.setItem("historyLinear", [
            currentHistoryItem,
            ...historyLinear,
        ]);

        setHistoryLinear([currentHistoryItem, ...historyLinear]);
    };

    React.useEffect(() => {
        const sessionStorageManager = new SessionStorageManager();
        const sessionHistoryLinear =
            sessionStorageManager.getItem<IHistoryItemLinear[]>(
                "historyLinear",
            );
        const sessionHistoryMatrix =
            sessionStorageManager.getItem<IHistoryItemMatrix[]>(
                "historyMatrix",
            );

        setHistoryLinear(sessionHistoryLinear || []);
        setHistoryMatrix(sessionHistoryMatrix || []);
    }, []);

    React.useEffect(() => {
        const sessionStorageManager = new SessionStorageManager();
        sessionStorageManager.setItem("historyLinear", historyLinear);
    }, [historyLinear]);

    React.useEffect(() => {
        const sessionStorageManager = new SessionStorageManager();
        sessionStorageManager.setItem("historyMatrix", historyMatrix);
    }, [historyMatrix]);

    return (
        <div className={style.phoneKeypad}>
            <div className={style.phoneKeypad__content}>
                <div className={style.phoneKeypad__keyboardWrapper}>
                    <Keyboard
                        keyHandler={historyHandler}
                        keyboardData={keyboardData}
                    />
                </div>
                <div className={style.phoneKeypad__historyWrapper}>
                    <HistoryLinear history={historyLinear} />
                    <HistoryMatrix history={historyMatrix} />
                </div>
            </div>
        </div>
    );
};

export default PhoneKeypad;
