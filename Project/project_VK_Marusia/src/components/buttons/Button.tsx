import React from 'react';
import './button.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'light' | 'dark';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick 
}) => {
  return (
    <button 
      className={`button button-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};