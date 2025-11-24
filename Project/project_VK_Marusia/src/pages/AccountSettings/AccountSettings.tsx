import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/logout";
import { useSearch } from "../../hooks/UseSearch";
import { Button } from "../../components/buttons/Button";
import "./accountSettings.css";

export const AccountSettings: React.FC = () => {

    const navigate = useNavigate();
    const { setUserProfile, userProfile } = useSearch();
    const fullName = userProfile?.name + ' ' + userProfile?.surname;
    const email = userProfile?.email;
    const av = userProfile?.name && userProfile?.surname ? (userProfile.name[0] + userProfile.surname[0]).toUpperCase() : '';

    return (
        <div className="account-info">
            <div className="account-row">
                <div className="avatar">{av}</div>

                <div className="account-field">
                    <div className="field-label">Имя Фамилия</div>
                    <div className="field-value name">{fullName}</div>
                </div>
            </div>

            <div className="account-row">
                <div className="avatar avatar--icon" aria-hidden>

                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  width="24.000000" height="24.000000" fill="none">
                        <rect id="icon / mail" width="24.000000" height="24.000000" x="0.000000" y="0.000000" fill="rgb(255,255,255)" fill-opacity="0" />
                        <path id="Vector" d="M21 3C21.5523 3 22 3.44772 22 4L22 20.0066C22 20.5552 21.5447 21 21.0082 21L2.9918 21C2.44405 21 2 20.5551 2 20.0066L2 19L20 19L20 7.3L12 14.5L2 5.5L2 4C2 3.44772 2.44772 3 3 3L21 3ZM8 15L8 17L0 17L0 15L8 15ZM5 10L5 12L0 12L0 10L5 10ZM19.5659 5L4.43414 5L12 11.8093L19.5659 5Z" fill="rgb(0,0,0)" fill-rule="nonzero" />
                    </svg>
                </div>

                <div className="account-field">
                    <div className="field-label">Электронная почта</div>
                    <a href={`mailto:${email}`} className="field-value email">{email}</a>

                </div>
            </div>
            <Button onClick={() =>
                logoutUser()
                    .then(() => {
                        navigate('/');
                        setUserProfile(null);

                    })
            }>Выйти из аккаунта</Button>
        </div>
    );
};