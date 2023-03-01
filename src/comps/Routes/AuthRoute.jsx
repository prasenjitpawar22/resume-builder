import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import FeatureProvider from '../../context/FeaturesContext';
import ResumeProvider from '../../context/ResumeContext';
import { UserContext } from '../../context/UserContext';

const AuthRoute = ({ children }) => {
    const { user } = useContext(UserContext)

    if (user.username === '') {
        console.log('no user');
        return <Navigate to={'/login'} />
    }
    console.log(user);
    return (
        <ResumeProvider>
            <FeatureProvider>
                <Outlet />
            </FeatureProvider >
        </ResumeProvider>
    );
}

export default AuthRoute;