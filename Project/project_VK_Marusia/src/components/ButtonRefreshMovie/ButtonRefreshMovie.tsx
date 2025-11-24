import React, { useState } from "react";
import "./ButtonRefreshMovie.css";

type Props = {
    onClick?: (rotate: boolean) => void;
    ariaLabel?: string;
};

export const ButtonRefreshMovie: React.FC<Props> = ({
    onClick,
    ariaLabel = "refresh",
}) => {
    const [rotating, setRotating] = useState(false);

    const handleClick = () => {
        setRotating(true);
        onClick?.(true);
        setTimeout(() => setRotating(false), 600); 
    };

    return (
        <button
            className="btn refresh-button"
            onClick={handleClick}
            aria-label={ariaLabel}
            type="button"
        >
            <img
                src="../public/refresh.svg"
                alt="refresh"
                className={rotating ? "refresh-icon rotating" : "refresh-icon"}
            />
        </button>
    );
};