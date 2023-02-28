import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthRoute from './AuthRoute';

export const ApplicationRoutes = (props) => {
    return (
        <Routes>
            <Route path={'/'} element={<AuthRoute />}>
                <Route path={'build'} element={<App />} />
            </Route>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/register'} element={<Register/>}/>
        </Routes>
    );
}
