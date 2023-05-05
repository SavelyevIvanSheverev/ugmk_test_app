import React from 'react';

import { Outlet } from 'react-router-dom';

import style from './Layout.module.scss';

const Layout = () => {
    return (
        <main className={style.root}>
            <Outlet />
        </main>
    );
};

export default Layout;
