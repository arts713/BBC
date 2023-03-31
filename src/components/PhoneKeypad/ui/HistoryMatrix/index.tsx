import * as React from "react";
import style from "../../index.module.scss";
import { PropsHistoryMatrix } from "./types";

const HistoryMatrix = ({ history }: PropsHistoryMatrix) => {
    return (
        <div className={style.phoneKeypad__history}>
            <p className={style.phoneKeypad__history__header}>Matrix history</p>
            <ul className={style.phoneKeypad__history__list}>
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

export default HistoryMatrix;
