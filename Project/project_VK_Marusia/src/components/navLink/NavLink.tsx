import React from 'react';
import { Link } from 'react-router-dom';
import './navLink.css';

interface NavLinkProps {
  to: string;
  variant?: 'default' | 'active' | 'light';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  variant = 'default', 
  className,
  children , 
  onClick

}) => {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`nav-link nav-link-${variant} ${className}`}
    >
      {children}
    </Link>
  );
};