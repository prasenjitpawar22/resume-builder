import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from '../App';
import Login from '../pages/Login';
import ProtectedRoutes from './ProtectedRoutes';

export const ApplicationRoutes = (props) => {
    return (
        <Routes>
            <Route path={'/'} element={<ProtectedRoutes />}>
                <Route path={'build'} element={<App />} />
            </Route>
            <Route path={'/login'} element={<Login/>}/>
        </Routes>
    );
}
