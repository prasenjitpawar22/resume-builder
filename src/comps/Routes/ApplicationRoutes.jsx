import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from '../../App';
import FeatureProvider from '../../context/FeaturesContext';
import ResumeProvider from '../../context/ResumeContext';
import { UserProvider } from '../../context/UserContext';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NewBuild from '../../pages/NewBuild';
import Register from '../../pages/Register';
import AuthRoute from './AuthRoute';
import UnAuthRoute from './UnAuthRout';

export const ApplicationRoutes = (props) => {
    return (
        <UserProvider>
            <Routes>
                <Route path={'/build'} element={<AuthRoute />}>
                    <Route index element={<App />} />
                </Route>
                <Route path='/' element={<UnAuthRoute />}>
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route path={'/new-build'} element={<NewBuild />} />
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </UserProvider>
    );
}
