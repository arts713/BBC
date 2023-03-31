import * as React from "react";
import style from "../../index.module.scss";
import { PropsHistoryLinear } from "./types";

const HistoryLinear = ({ history }: PropsHistoryLinear) => {
    return (
        <div className={style.phoneKeypad__history}>
            <p className={style.phoneKeypad__history__header}>Linear history</p>
            <ul className={style.phoneKeypad__history__list}>
                {history.map((item, index) => {
                    return (
                        <li key={index}>
                            <span>
                                <b>{item.label}</b>
                            </span>
                            --
                            <span>{item.timestamp}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default HistoryLinear;
