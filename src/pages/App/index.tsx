import * as React from "react";
import style from "./index.module.scss";

function App() {
    return (
        <div className={style.app}>
            <div
                className={`${style.app__container} ${style.app__container_center}`}
            >
                <h1>BBC</h1>
            </div>
        </div>
    );
}

export default App;
