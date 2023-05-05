import React, { ReactNode, useState, useRef, useEffect } from 'react';

import cx from 'classnames';

import style from './Select.module.scss';
import { SelectContext } from './selectContext';
import useOnClickOutside from '../../hooks/useOnClickOutside';


export type selectOption = {
    value: string | number;
    name: string | React.ReactNode;
}

const Select: React.FC<{
    onChange: (value: string) => void;
    options: selectOption[],
    children: ReactNode | ReactNode[];
    defaultValue?: string;
    placeholder?: string;
    className?: string;
}> = ({ options, children, defaultValue, placeholder, className, onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const showDropdownHandler = () => setShowDropdown(!showDropdown);
    const selectPlaceholder = placeholder || 'Choose an option';
    const selectContainerRef = useRef(null);

    useEffect(() => {
        if (defaultValue) {
            setSelectedOption(defaultValue);
        }
    }, [defaultValue]);

    const clickOutsideHandler = () => setShowDropdown(false);

    useOnClickOutside(selectContainerRef, clickOutsideHandler);

    const updateSelectedOption = (option: string) => {
        setSelectedOption(option);
        onChange(option);
        setShowDropdown(false);
    };

    return (
        <SelectContext.Provider
            value={{ selectedOption, changeSelectedOption: updateSelectedOption }}
        >
            <div className={cx(showDropdown && style['root--active'], style.root, className)} ref={selectContainerRef}>
                <div
                    className={style.selected_text}
                    onClick={showDropdownHandler}
                >
                    {selectedOption.length > 0 ? options.find(option => option.value === selectedOption)?.name : selectPlaceholder}
                </div>
                <ul
                    className={cx(showDropdown ? style.show_dropdown_options : style.hide_dropdown_options, style.select_options)}
                >
                    {children}
                </ul>
            </div>
        </SelectContext.Provider>
    );
};

export default Select;

