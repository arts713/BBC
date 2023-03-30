import * as React from "react";
import style from "./index.module.scss";

type IKey = {
    mainSign: string;
    additionalSigns?: string;
};

type IHistoryItemLinear = {
    label: string;
    timestamp: number;
};

type ICoordinatesOX = number;
type ICoordinatesOY = number;
type IHistoryItemMatrix = [ICoordinatesOX, ICoordinatesOY];

type IHistoryHandler = (
    sign: PropsKey["mainSign"],
    ox: PropsKey["ox"],
    oy: PropsKey["oy"],
) => void;

type PropsKeyboard = {
    keyboardData: IKey[][];
};

type PropsKey = IKey & {
    ox: ICoordinatesOX;
    oy: ICoordinatesOY;
    keyHandler: IHistoryHandler;
};

type PropsHistoryLinear = {
    history: IHistoryItemLinear[] | [];
};

type PropsHistoryMatrix = {
    history: IHistoryItemMatrix[] | [];
};

const KeyButton = ({
    mainSign,
    additionalSigns,
    keyHandler,
    ox,
    oy,
}: PropsKey) => {
    return (
        <button
            className={style.keyButton}
            onClick={() => keyHandler(mainSign, ox, oy)}
        >
            <span className={style.keyButton__container}>
                {additionalSigns && (
                    <span className={style.keyButton__additionalSign}>
                        {additionalSigns}
                    </span>
                )}
                <span className={style.keyButton__mainSign}>{mainSign}</span>
            </span>
        </button>
    );
};

const CustomKeyboardButtonsRow = ({
    keybordRowData,
    keyHandler,
    rowIndex,
}: {
    keybordRowData: IKey[];
    keyHandler: IHistoryHandler;
    rowIndex: number;
}) => {
    return (
        <ul className={style.customKeyboard__row}>
            {keybordRowData.map((data, index) => {
                return (
                    <li className={style.customKeyboard__button} key={index}>
                        <KeyButton
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

const CustomKeyboardButtons = ({
    keyboardData,
    keyHandler,
}: {
    keyboardData: IKey[][];
    keyHandler: IHistoryHandler;
}) => {
    return (
        <ul className={style.customKeyboard__rows}>
            {keyboardData.map((data, index) => {
                return (
                    <li key={index}>
                        <CustomKeyboardButtonsRow
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

const KeyboardHistoryMatrix = ({ history }: PropsHistoryMatrix) => {
    return (
        <div className={style.customKeyboard__history}>
            <p className={style.customKeyboard__history__header}>
                Matrix history
            </p>
            <ul className={style.customKeyboard__history__list}>
                {history.map((item, index) => {
                    return (
                        <li key={index}>
                            <div>{`[${item[0]},${item[1]}]`}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const KeyboardHistoryLinear = ({ history }: PropsHistoryLinear) => {
    return (
        <div className={style.customKeyboard__history}>
            <p className={style.customKeyboard__history__header}>
                Linear history
            </p>
            <ul className={style.customKeyboard__history__list}>
                {history.map((item, index) => {
                    return (
                        <li key={index}>
                            <span>{item.label}</span>--
                            <span>{item.timestamp}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const CustomKeyboard = ({ keyboardData }: PropsKeyboard) => {
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

        setHistoryMatrix([...historyMatrix, [matrixOY, matrixOX]]);
    };

    const historyLinearHandler = (label: PropsKey["mainSign"]): void => {
        const currentHistoryItem: IHistoryItemLinear = {
            label,
            timestamp: new Date().getTime(),
        };

        setHistoryLinear([...historyLinear, currentHistoryItem]);
    };

    return (
        <div className={style.customKeyboard}>
            <div className={style.customKeyboard__content}>
                <div className={style.customKeyboard__keyboardWrapper}>
                    <CustomKeyboardButtons
                        keyHandler={historyHandler}
                        keyboardData={keyboardData}
                    />
                </div>
                <div className={style.customKeyboard__historyWrapper}>
                    <KeyboardHistoryLinear history={historyLinear} />
                    <KeyboardHistoryMatrix history={historyMatrix} />
                </div>
            </div>
        </div>
    );
};

export default CustomKeyboard;
