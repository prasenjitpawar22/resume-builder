import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from '../../App';
import FeatureProvider from '../../context/FeaturesContext';
import ResumeProvider from '../../context/ResumeContext';
import { UserProvider } from '../../context/UserContext';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import AuthRoute from './AuthRoute';

export const ApplicationRoutes = (props) => {
  return (
    <UserProvider>
      <Routes>
        <Route path={'/'} element={<AuthRoute />}>
          <Route index element={<App />}/>
        </Route>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
      </Routes>
    </UserProvider>
  );
}
