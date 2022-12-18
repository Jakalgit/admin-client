import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {routes} from "../routes";
import Cookies from 'universal-cookie';

const AppRouter = () => {

    const cookies = new Cookies()

    if (!cookies.get('user_id')) {
        const cookieDate = new Date().getTime()
        cookies.set('user_id', cookieDate, {path: '/'})
    }

    const token = cookies.get('user_id')

    if (token !== '12121212121212') {
        return (
            <div>
                Не авторизован
            </div>
        )
    }

    return (
        <Routes>
            {routes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
        </Routes>
    );
};

export default AppRouter;