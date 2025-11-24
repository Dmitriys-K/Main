import React, { useState } from "react";
import "./buttonHeart.css"

// type Props = {
//     onClick?: (filled: boolean) => void;
//     initialFilled?: boolean;
//     ariaLabel?: string;
// };

// export const ButtonHeart: React.FC<Props> = ({
//     onClick,
//     initialFilled = false,
//     ariaLabel = "Like",
// }) => {
//     const [filled, setFilled] = useState<boolean>(initialFilled);

//     const handleClick = () => {
//         const next = !filled;
//         setFilled(next);
//         onClick?.(next);
//     };

//     // console.log(filled);

//     return (
//         <button
//             className=" btn bh-button"
//             onClick={handleClick}
//             aria-pressed={filled}
//             aria-label={ariaLabel}
//             type="button"
//         >

//             {!filled ? <img src="/buttonHeart.svg" alt="heart" /> : <img src="/buttonHeartFill.svg" alt="fill-heart" />}

//         </button>
//     );
// };

// export default ButtonHeart;


// ButtonHeart.tsx
type Props = {
    onClick?: (filled: boolean) => void;
    initialFilled?: boolean;
    filled?: boolean; // добавьте этот проп
    ariaLabel?: string;
};

export const ButtonHeart: React.FC<Props> = ({
    onClick,
    initialFilled = false,
    filled: filledProp, // получаем проп
    ariaLabel = "Like",
}) => {
    const [filledState, setFilledState] = useState<boolean>(initialFilled);

    // Если передан проп filled, используем его, иначе локальный стейт
    const filled = filledProp !== undefined ? filledProp : filledState;

    const handleClick = () => {
        const next = !filled;
        setFilledState(next);
        onClick?.(next);
    };

    return (
        <button
            className="btn bh-button"
            onClick={handleClick}
            aria-pressed={filled}
            aria-label={ariaLabel}
            type="button"
        >
            {!filled ? <img src="/buttonHeart.svg" alt="heart" /> : <img src="/buttonHeartFill.svg" alt="fill-heart" />}
        </button>
    );
};