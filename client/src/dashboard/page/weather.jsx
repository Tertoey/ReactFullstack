import React from 'react';
import '../style/dashboard.css';
import Navbar from '../component/nav_bar'
import Weather from '../component/weather';

function App() {

  return (
    <div className='flex'>
      <Navbar/>
      {/* Content */}
      <Weather/>
    </div>
  );
}

export default App;
