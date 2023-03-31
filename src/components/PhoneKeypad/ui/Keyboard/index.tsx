import * as React from "react";
import style from "../../index.module.scss";
import { IHistoryHandler } from "../../types";
import KeyboardButton from "../KeyboardButton";
import { IKey } from "../KeyboardButton/types";

const KeyboardRow = ({
    keybordRowData,
    keyHandler,
    rowIndex,
}: {
    keybordRowData: IKey[];
    keyHandler: IHistoryHandler;
    rowIndex: number;
}) => {
    return (
        <ul className={style.phoneKeypad__row}>
            {keybordRowData.map((data, index) => {
                return (
                    <li className={style.phoneKeypad__button} key={index}>
                        <KeyboardButton
                            ox={index}
                            oy={rowIndex}
                            keyHandler={keyHandler}
                            mainSign={data.mainSign}
                            additionalSigns={data.additionalSigns}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

const Keyboard = ({
    keyboardData,
    keyHandler,
}: {
    keyboardData: IKey[][];
    keyHandler: IHistoryHandler;
}) => {
    return (
        <ul className={style.phoneKeypad__rows}>
            {keyboardData.map((data, index) => {
                return (
                    <li key={index}>
                        <KeyboardRow
                            rowIndex={index}
                            keyHandler={keyHandler}
                            keybordRowData={data}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default Keyboard;
