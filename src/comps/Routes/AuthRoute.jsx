import React, { useContext, useEffect } from 'react';
import { useNavigate, Outlet, redirect } from 'react-router-dom';


import FeatureProvider from '../../context/FeaturesContext';
import ResumeProvider from '../../context/ResumeContext';
import { UserContext } from '../../context/UserContext';
import { Loader } from '../Loader';

const AuthRoute = ({ children }) => {
  const { user, userLoader } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.logedIn && !userLoader) {
      navigate('/login',)
    }
  }, [userLoader])

  return (
    userLoader ? <Loader /> :
      // if userlogedIn outlet, else render login page
      user.logedIn && <ResumeProvider>
        <FeatureProvider> <Outlet />
        </FeatureProvider >
      </ResumeProvider>
    // : navigate('/login'))
  )
}

export default AuthRoute;