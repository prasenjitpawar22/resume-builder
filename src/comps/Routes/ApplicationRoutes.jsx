import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, ClerkProvider } from '@clerk/clerk-react'

import App from '../../App';
import Home from '../../pages/Home';
import NewBuild from '../../pages/NewBuild';
import ResumeDownload from '../Resume/ResumeDownload';
import AuthRoute from './AuthRoute';
import FormsDataProvider from '../../context/FormsDataContext';

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
                            <SignIn redirectUrl={'new-build'} signUpUrl='/register' />
                        </div>
                    }
                />
                <Route
                    path="register"
                    element={
                        <div className='flex min-h-screen justify-center items-center'>
                            <SignUp redirectUrl={'new-build'} signInUrl='/login' />
                        </div>
                    }
                />
                {/* <Route path='download' element={
                    <FormsDataProvider>
                        <ResumeDownload />
                    </FormsDataProvider>
                } /> */}
                <Route path="/new-build" element={<AuthRoute />}>
                    <Route index element={<NewBuild />} />
                </Route>
            </Routes>

        </ClerkProvider>
    );
}
