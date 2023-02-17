import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ResumeProvider from './context/ResumeContext';
import ResumeDownload from './comps/Resume/ResumeDownload';
import FeatureProvider from './context/FeaturesContext';

// const {
//   leftBlockWidth, printRef,
//   resumeBlockHolderWidth, resumeColor,
//   resumeEduData, resumeExpData,
//   resumeHeaderData, resumeSkillData,
//   setResumeBlockHolderWidth, setResumeColor,
//   setResumeEduData, setResumeExpData,
//   setResumeHeaderData, setResumeSkillData,
//   setLeftBlockWidth,
// } = useContext(ResumeContext)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/download-resume',
    element: <ResumeDownload />
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FeatureProvider>
      <ResumeProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </ResumeProvider>
    </FeatureProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
