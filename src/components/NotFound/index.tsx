import React from 'react';

import { Link } from 'react-router-dom';

import style from './NotFound.module.scss';
const NotFound = () => {
    return (
        <div className={style.root}>
            <h1 className={style.title}>404</h1>
            <p className={style.description}>Что-то пошло не так...</p>
            <Link to="/">На главную</Link>
        </div>
    );
};

export default NotFound;
