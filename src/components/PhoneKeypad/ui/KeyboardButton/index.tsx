import { PropsKey } from "./types";
import style from "./index.module.scss";

const KeyboardButton = ({
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

export default KeyboardButton;
