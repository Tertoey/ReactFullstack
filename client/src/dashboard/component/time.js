import React, {useEffect,useState  } from 'react';

const App = () => {
        const [currentTime, setCurrentTime] = useState(new Date());
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); // Update every second
    
        return () => {
          clearInterval(interval);
        };
      }, []);
        return (
            <p>
              {currentTime.toLocaleString('en-GB', {
                timeZone: 'Asia/Bangkok',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </p> 
        );
      };
      
      export default App;