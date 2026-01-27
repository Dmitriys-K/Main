import React from 'react';
import './Button.css';

export interface ButtonProps {
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { onClick, children, variant } = props;
    return (
        <button className={`AddTodoButton ${variant ? `AddTodoButton--${variant}` : ''}`} type='button'

            onClick={onClick ? () => setTimeout(() => onClick?.(), 0) : undefined}

        >
            {children}
        </button>);
};
export default Button;