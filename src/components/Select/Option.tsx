import React, { ReactNode } from 'react';

import style from './Select.module.scss';
import { useSelectContext } from './selectContext';


const Option: React.FC<{
    children: ReactNode | ReactNode[];
    value: string;
}> = ({ children, value }) => {
    const { changeSelectedOption } = useSelectContext();

    return (
        <li className={style.select_option} onClick={() => changeSelectedOption(value)}>
            {children}
        </li>
    );
};

export default Option;
