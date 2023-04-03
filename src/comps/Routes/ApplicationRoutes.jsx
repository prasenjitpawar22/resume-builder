import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from '../../App';
import FeatureProvider from '../../context/FeaturesContext';
import FormsDataProvider from '../../context/FormsDataContext';
import ResumeProvider from '../../context/ResumeContext';
import { UserProvider } from '../../context/UserContext';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NewBuild from '../../pages/NewBuild';
import Register from '../../pages/Register';
import ResumeDownload from '../Resume/ResumeDownload';
import AuthRoute from './AuthRoute';
import UnAuthRoute from './UnAuthRout';

export const ApplicationRoutes = (props) => {
    return (
        <UserProvider>
            <Routes>
                <Route path={'/new-build'} element={<AuthRoute />}>
                    {/* <Route index element={<App />} /> */}

                    <Route index element={<NewBuild />} />

                </Route>
                <Route path='/' element={<UnAuthRoute />}>
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route path={'/download'} element={<ResumeDownload />} />
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </UserProvider>
    );
}
