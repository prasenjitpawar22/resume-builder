import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AuthRoute = ({ children }) => {
    const {user} = useContext(UserContext)

    if(!user){
        console.log('no user');
        return <Navigate to={'/login'} />
    }

    return (
        <Outlet />
    );
}

export default AuthRoute;