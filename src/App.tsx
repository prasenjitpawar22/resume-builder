import './App.css';
import React, { } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import ResumeBuildSidebar from './comps/sidebar/ResumeBuildSidebar';

const App: React.FC = () => {

  return (
    <div className="App">
      <ResumeBuildSidebar />
    </div >
  );
}

export default App;
