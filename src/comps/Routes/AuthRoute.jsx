import React, { useContext, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';


import FeatureProvider from '../../context/FeaturesContext';
import ResumeProvider from '../../context/ResumeContext';
import { UserContext } from '../../context/UserContext';

const AuthRoute = ({ children }) => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user.logedIn){
            navigate('/login')
        }
    })

    return (
        <ResumeProvider>
            <FeatureProvider>
                <Outlet />
            </FeatureProvider >
        </ResumeProvider>
    );
}

export default AuthRoute;