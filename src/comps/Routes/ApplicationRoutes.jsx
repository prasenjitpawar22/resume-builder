import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, ClerkProvider } from '@clerk/clerk-react'

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

const clerk_pub_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export const ApplicationRoutes = (props) => {
    const navigate = useNavigate();

    return (
        <ClerkProvider publishableKey={clerk_pub_key}
            navigate={(to) => navigate(to)}
        >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={
                        <div className='flex min-h-screen justify-center items-center'>
                            <SignIn signUpUrl='/register' />
                        </div>
                    }
                />
                <Route
                    path="register"
                    element={
                        <div className='flex min-h-screen justify-center items-center'>
                            <SignUp signInUrl='/login' />
                        </div>
                    }
                />
                <Route path="/new-build" element={<AuthRoute />}>
                    <Route
                        index
                        element={
                            <SignedIn>
                                <NewBuild />
                            </SignedIn>
                        }
                    />
                </Route>
            </Routes>

        </ClerkProvider>
    );
}
