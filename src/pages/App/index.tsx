import * as React from "react";
import PhoneKeypad from "../../components/PhoneKeypad";
import style from "./index.module.scss";

const keyboardMock = [
    [
        { mainSign: "1" },
        { mainSign: "2", additionalSigns: "abc" },
        { mainSign: "3", additionalSigns: "def" },
    ],
    [
        { mainSign: "4", additionalSigns: "ghi" },
        { mainSign: "5", additionalSigns: "jkl" },
        { mainSign: "6", additionalSigns: "mno" },
    ],
    [
        { mainSign: "7", additionalSigns: "pqrs" },
        { mainSign: "8", additionalSigns: "tuv" },
        { mainSign: "9", additionalSigns: "wzyz" },
    ],
    [{ mainSign: "＊" }, { mainSign: "0" }, { mainSign: "#" }],
];

function App() {
    return (
        <div className={style.app}>
            <div
                className={`${style.app__container} ${style.app__container_center}`}
            >
                <PhoneKeypad keyboardData={keyboardMock} />
            </div>
        </div>
    );
}

export default App;
