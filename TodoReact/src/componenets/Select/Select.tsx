import React from 'react';
import Select from 'react-select';
// import { v4 as uuidv4 } from 'uuid';
import './select.css';

export type Option = {
  value: string;
  label: string;
};

export const SelectComponent: React.FC<{
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
}> = ({ options, value, onChange }) => {
  return (
    <Select
    isClearable
      options={options}
      value={value}
      onChange={onChange}
      className="select"
      classNamePrefix="select"
      placeholder="Выбор услуги ..."
    />
  );
};
