import React from 'react';
import '../style/dashboard.css';
import Navbar from '../component/nav_bar'
import MainDash from '../component/MainDash';

function App() {

  return (
    <div className='flex'>
      <Navbar/>
      {/* Content */}
      <MainDash/>
    </div>
  );
}

export default App;
