import React from 'react';
import { NavLink,  } from "../../components/navLink/NavLink";
import { Outlet } from 'react-router-dom';
import './accountPage.css';

export const AccountPage: React.FC = () => {

  return (
    <div className="account-page">
      <h2 className="account-title">Мой аккаунт</h2>
        <nav className="account-links">
           <NavLink className="account-link favorite" to="favorites">Избранные фильмы</NavLink>
            <NavLink className="account-link settings" to="settings">Настройка аккаунта</NavLink>
        </nav>
        <Outlet />
   
    </div>
  );
};