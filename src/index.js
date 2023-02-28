import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import { ApplicationRoutes } from './comps/ApplicationRoutes';
import reportWebVitals from './reportWebVitals';
import ResumeProvider from './context/ResumeContext';
import FeatureProvider from './context/FeaturesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FeatureProvider>
      <ResumeProvider>
        <Router>
          <ApplicationRoutes />
        </Router>
      </ResumeProvider>
    </FeatureProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
