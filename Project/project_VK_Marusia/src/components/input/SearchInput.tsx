import React from 'react';
import './sesrchInput.css';

export interface SearchInputProps {
    value: string;
    handleChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    value,
    handleChange,
    onFocus,
    onBlur }) => {
 
    return (
        <input
            type="text"
            placeholder="Поиск"
            className="search-input"
            value={value}
            onChange={e => handleChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};