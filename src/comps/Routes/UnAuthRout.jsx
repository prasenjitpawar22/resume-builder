import React, { useContext, useEffect } from 'react';
import { Outlet, } from 'react-router-dom';


import { UserContext } from '../../context/UserContext';
import { Loader } from '../Loader';

const UnAuthRoute = ({ children }) => {
    const { userLoader } = useContext(UserContext)

    // useEffect(() => {
    //     console.log("check in unauth routes");
    // }, [userLoader])

    return (
        userLoader ? <Loader /> :
            // if userlogedIn outlet, else render login page
            <Outlet />
        // : navigate('/login'))
    )
}

export default UnAuthRoute;