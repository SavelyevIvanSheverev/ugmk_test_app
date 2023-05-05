import React from 'react';

import style from './Error.module.scss';

const Error = () => {
    const onClickReloadPage = () => {
        window.location.reload();
    };

    return (
        <div className={style.root}>
            Что-то пошло не так, обновите страницу
            <button className={style.button} onClick={onClickReloadPage}>Обновить</button>
        </div>
    );
};

export default Error;
