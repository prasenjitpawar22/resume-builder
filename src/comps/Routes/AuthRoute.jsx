import React, { useContext, useEffect } from 'react';
import { useNavigate, Outlet, redirect } from 'react-router-dom';
import { SignedIn, useClerk, useUser } from '@clerk/clerk-react'
import Cookies from 'js-cookie'

import FeatureProvider from '../../context/FeaturesContext';
import ResumeProvider from '../../context/ResumeContext';
import { UserContext } from '../../context/UserContext';
import { Loader } from '../Loader';
import FormsDataProvider from '../../context/FormsDataContext';

const AuthRoute = ({ children }) => {
  const navigate = useNavigate()

  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut } = useClerk()

  useEffect(() => {
    // console.log('isLoading', isLoaded);
    const token = Cookies.get('__session')
    if (!token) {
      console.log('inn');
      navigate('/login')
    }
  }, [isSignedIn])

  return (
    !isLoaded ? <Loader /> :
      // if userlogedIn outlet, else render login page
      isSignedIn && <SignedIn>
        <FormsDataProvider>
          <Outlet />
        </FormsDataProvider>
      </SignedIn>
    // : navigate('/login'))
  )
}

export default AuthRoute;